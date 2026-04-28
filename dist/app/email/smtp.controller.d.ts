import { SendMailRequest } from "./input";
import { SmtpService } from "./smtp.service";
export declare class SmtpController {
    private readonly smtpService;
    constructor(smtpService: SmtpService);
    sendMail(payload: SendMailRequest): Promise<import("./input").SendMailOutput>;
}
