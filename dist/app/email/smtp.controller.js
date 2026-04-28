"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpController = void 0;
const smtp_service_1 = require("./smtp.service");
const smtpService = new smtp_service_1.SmtpService();
class SmtpController {
    async sendMail(payload) {
        return smtpService.sendMail(payload);
    }
}
exports.SmtpController = SmtpController;
//# sourceMappingURL=smtp.controller.js.map