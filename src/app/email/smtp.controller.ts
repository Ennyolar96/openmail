import { SendMailRequest } from "./input";
import { SmtpService } from "./smtp.service";

export class SmtpController {
    constructor(private readonly smtpService: SmtpService) { }

    async sendMail(payload: SendMailRequest) {
        return this.smtpService.sendMail(payload);
    }
}
