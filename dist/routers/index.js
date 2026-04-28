"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouters = void 0;
const smtp_controller_1 = require("../app/email/smtp.controller");
const applicationRouters = (app) => {
    const smtpController = new smtp_controller_1.SmtpController();
    app.post("/send-mail", async (req, res, next) => {
        try {
            const result = await smtpController.sendMail(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.applicationRouters = applicationRouters;
//# sourceMappingURL=index.js.map