import { SendMailRequest } from "@/app/email/input";
import { SmtpController } from "@/app/email/smtp.controller";
import { validateBody } from "@/global/middleware";
import { Application, NextFunction, Request, Response } from "express";

export const applicationRouters = (app: Application) => {
    const smtpController = new SmtpController();

}