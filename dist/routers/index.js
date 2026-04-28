"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const input_1 = require("../app/email/input");
const smtp_service_1 = require("../app/email/smtp.service");
const middleware_1 = require("../global/middleware");
const applicationRouters = (app) => {
    app.post("/send-mail", (0, middleware_1.validateBody)(input_1.SendMailRequest), async (req, res, next) => {
        try {
            const result = await smtp_service_1.SmtpService.sendMail(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.applicationRouters = applicationRouters;
//# sourceMappingURL=index.js.map