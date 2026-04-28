import * as nodemailer from "nodemailer";
import type { SendMailOutput, SendMailRequest } from "./input";
export declare const SmtpService: {
    sendMail(payload: SendMailRequest): Promise<SendMailOutput>;
    config(config: SendMailRequest["config"]): nodemailer.Transporter;
};
