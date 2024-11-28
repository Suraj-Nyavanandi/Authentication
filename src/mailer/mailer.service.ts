// src/mailer/mailer.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'krisurajdec@gmail.com', // Your Gmail address
        pass: 'cdlv tgyo xnuy tpnb',  // Your app-specific password
      },
    });
  }

  async sendMail(to: string, subject: string, textContent: string, htmlContent?: string): Promise<void> {
    try {
      this.logger.log(`Sending email to ${to} with subject "${subject}"`);
      const info = await this.transporter.sendMail({
        from: '"Your App Name" <krisurajdec@gmail.com>', // Update the display name if needed
        to,
        subject,
        text: textContent,
        html: htmlContent,
      });

      this.logger.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`, error.stack);
      throw error;
    }
  }
}

