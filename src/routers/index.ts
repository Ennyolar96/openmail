
import { SmtpService } from "@/app/email/smtp.service";
import { validateBody } from "@/global/middleware";
import { Application, NextFunction, Request, Response } from "express";
import * as nodemailer from "nodemailer";
import pLimit from "p-limit";
import { SendMailOutput, SendMailRequest } from "@/app/email/input";


const config = (config: SendMailRequest["config"]): nodemailer.Transporter => {
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

export const applicationRouters = (app: Application) => {
    app.post(
        "/send-mail",
        validateBody<SendMailRequest>(SendMailRequest),
        async (req: Request, res: Response, next: NextFunction) => {
            const payload = req.body as SendMailRequest
            const limit = pLimit(5);
            const mail = config(payload.config);

            try {
                // Map over 'to' addresses and limit concurrency
                // Wrapping with try/catch ensures we capture the 'to' address even on failure
                // const task = payload.mail.to.map((to) => {
                //   return limit(async () => {
                //     try {
                //       const result = await mail.sendMail({ ...payload.mail, to });
                //       return { to, response: result.response as string };
                //     } catch (error: any) {
                //       return Promise.reject({
                //         to,
                //         reason: error?.message || "Unknown error",
                //       });
                //     }
                //   });
                // });

                // const data = await Promise.allSettled(task);

                // // TypeScript requires type predicates to narrow down union types from Promise.allSettled
                // const rejected = data.filter(
                //   (item): item is PromiseRejectedResult => item.status === "rejected",
                // );
                // const accepted = data.filter(
                //   (
                //     item,
                //   ): item is PromiseFulfilledResult<{ to: string; response: string }> =>
                //     item.status === "fulfilled",
                // );

                // return {
                //   success: true,
                //   message: "Email send successfully",
                //   data: {
                //     accepted: accepted.map((item) => item.value.to),
                //     rejected: rejected.map((item) => item.reason.to),
                //     response: accepted.map((item) => item.value.response),
                //   },
                // };
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to send email please try again",
                    data: {
                        accepted: [],
                        rejected: [],
                        response: ["Failed to send email please try again"],
                    },
                });
            } finally {
                mail.close();
            }
            //         } catch (error) {
            //             next(error);
            //         }
            // },
            // );
        })
}