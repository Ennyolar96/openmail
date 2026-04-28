import { SendMailRequest } from "@/app/email/input";
import { SmtpService } from "@/app/email/smtp.service";
import { Application, NextFunction, Request, Response } from "express";

export const applicationRouters = (app: Application) => {
    app.post(
        "/send-mail",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await SmtpService.sendMail(req.body as SendMailRequest);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        },
    );
}