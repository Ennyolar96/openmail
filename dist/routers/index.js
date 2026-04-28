"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const smtp_controller_1 = require("@/app/email/smtp.controller");
const applicationRouters = (app) => {
    const smtpController = new smtp_controller_1.SmtpController();
};
exports.applicationRouters = applicationRouters;
//# sourceMappingURL=index.js.map