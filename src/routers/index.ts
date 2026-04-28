import { SendMailRequest } from "@/app/email/input";
import { SmtpController } from "@/app/email/smtp.controller";
import { SmtpService } from "@/app/email/smtp.service";
import { validateBody } from "@/global/middleware";
import { Application, NextFunction, Request, Response } from "express";

export const applicationRouters = (app: Application) => {
    const smtpController = new SmtpService();
    app.post(
        "/send-mail",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await smtpController.sendMail(req.body as SendMailRequest);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        },
    );
}