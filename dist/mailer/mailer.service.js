"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = MailerService_1 = class MailerService {
    constructor() {
        this.logger = new common_1.Logger(MailerService_1.name);
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'krisurajdec@gmail.com',
                pass: 'cdlv tgyo xnuy tpnb',
            },
        });
    }
    async sendMail(to, subject, textContent, htmlContent) {
        try {
            this.logger.log(`Sending email to ${to} with subject "${subject}"`);
            const info = await this.transporter.sendMail({
                from: '"Your App Name" <krisurajdec@gmail.com>',
                to,
                subject,
                text: textContent,
                html: htmlContent,
            });
            this.logger.log(`Email sent successfully: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = MailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
//# sourceMappingURL=mailer.service.js.map