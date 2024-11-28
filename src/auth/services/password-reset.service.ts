// src/auth/services/password-reset.service.ts

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordReset } from '../schemas/password-reset.schema';
import { User } from '../schemas/user.schema';
import { MailerService } from '../../mailer/mailer.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(
    @InjectModel(PasswordReset.name) private readonly passwordResetModel: Model<PasswordReset>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  async generateResetToken(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000);

    await this.passwordResetModel.create({ email, token, expiresAt });

    const resetLink = `http://localhost:5000/password-reset/reset?token=${token}`;
    await this.mailerService.sendMail(
      email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetLink}`,
      `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetRequest = await this.passwordResetModel.findOne({ token });

    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.updateOne(
      { email: resetRequest.email },
      { password: hashedPassword }
    );

    await this.passwordResetModel.deleteOne({ token });
  }
}
