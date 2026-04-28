import type { SendMailOutput, SendMailRequest } from "./input";
export declare class SmtpService {
    sendMail(payload: SendMailRequest): Promise<SendMailOutput>;
    private config;
}
