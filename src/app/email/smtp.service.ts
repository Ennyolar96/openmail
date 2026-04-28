import * as nodemailer from "nodemailer";
import type { SendMailOutput, SendMailRequest } from "./input";

async function mapWithConcurrency<TIn, TOut>(
  items: readonly TIn[],
  concurrency: number,
  mapper: (item: TIn) => Promise<TOut>,
): Promise<PromiseSettledResult<TOut>[]> {
  const results: PromiseSettledResult<TOut>[] = new Array(items.length);
  const workerCount = Math.max(1, Math.min(items.length, concurrency || 1));

  let nextIndex = 0;
  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const current = nextIndex++;
      if (current >= items.length) return;

      try {
        const value = await mapper(items[current]);
        results[current] = { status: "fulfilled", value };
      } catch (reason) {
        results[current] = { status: "rejected", reason };
      }
    }
  });

  await Promise.all(workers);
  return results;
}

export class SmtpService {
  async sendMail(payload: SendMailRequest): Promise<SendMailOutput> {
    const mail = this.config(payload.config);
    const concurrency = process.env.EMAIL_CONCURRENCY
      ? Number.parseInt(process.env.EMAIL_CONCURRENCY, 10)
      : 5;

    try {
      const data = await mapWithConcurrency(
        payload.mail.to,
        concurrency,
        async (to) => {
          const result = await mail.sendMail({ ...payload.mail, to });
          return { to, response: result.response as string };
        },
      );

      // TypeScript requires type predicates to narrow down union types from Promise.allSettled
      const rejected = data.filter(
        (item): item is PromiseRejectedResult => item.status === "rejected",
      );
      const accepted = data.filter(
        (
          item,
        ): item is PromiseFulfilledResult<{ to: string; response: string }> =>
          item.status === "fulfilled",
      );

      return {
        success: true,
        message: "Email send successfully",
        data: {
          accepted: accepted.map((item) => item.value.to),
          rejected: rejected.map((item) => item.reason.to),
          response: accepted.map((item) => item.value.response),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to send email please try again",
        data: {
          accepted: [],
          rejected: [],
          response: ["Failed to send email please try again"],
        },
      };
    } finally {
      mail.close();
    }
  }

  private config(config: SendMailRequest["config"]): nodemailer.Transporter {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      pool: true,
      maxConnections: 5,
    });

    return transporter;
  }
}
