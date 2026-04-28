"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpController = void 0;
class SmtpController {
    constructor(smtpService) {
        this.smtpService = smtpService;
    }
    async sendMail(payload) {
        return this.smtpService.sendMail(payload);
    }
}
exports.SmtpController = SmtpController;
//# sourceMappingURL=smtp.controller.js.map