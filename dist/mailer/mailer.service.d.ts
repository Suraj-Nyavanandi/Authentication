export declare class MailerService {
    private readonly logger;
    private readonly transporter;
    constructor();
    sendMail(to: string, subject: string, textContent: string, htmlContent?: string): Promise<void>;
}
