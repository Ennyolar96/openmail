import type { SendMailOutput, SendMailRequest } from "./input";
export declare class SmtpService {
    constructor();
    sendMail(payload: SendMailRequest): Promise<SendMailOutput>;
    private config;
}
