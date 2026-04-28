export interface mailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
export interface mailAttachment {
    filename?: string;
    content?: string;
    path?: string;
    contentType?: string;
    cid?: string;
}
export interface mailInput {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
    attachments?: mailAttachment[];
}
export interface SendMailInput {
    config: mailConfig;
    mail: mailInput;
}
export interface SendMailOutput {
    success: boolean;
    message: string;
    data: {
        accepted: string[];
        rejected: string[];
        response: string[];
    };
}
