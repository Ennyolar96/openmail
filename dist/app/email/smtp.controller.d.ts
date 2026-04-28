import { SendMailRequest } from "./input";
export declare class SmtpController {
    sendMail(payload: SendMailRequest): Promise<import("./input").SendMailOutput>;
}
