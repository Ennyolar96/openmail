import type { mailAttachment, mailConfig, mailInput, SendMailInput } from "./smtp.interface";
declare class MailAuth {
    user: string;
    pass: string;
}
declare class SendMailConfig implements mailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: MailAuth;
}
declare class MailAttachment implements mailAttachment {
    filename?: string;
    content?: string;
    path?: string;
    contentType?: string;
    cid?: string;
}
declare class SendMail implements mailInput {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    attachments?: MailAttachment[];
}
export declare class SendMailRequest implements SendMailInput {
    config: SendMailConfig;
    mail: SendMail;
}
export {};
