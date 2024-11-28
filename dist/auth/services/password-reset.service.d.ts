import { Model } from 'mongoose';
import { PasswordReset } from '../schemas/password-reset.schema';
import { User } from '../schemas/user.schema';
import { MailerService } from '../../mailer/mailer.service';
export declare class PasswordResetService {
    private readonly passwordResetModel;
    private readonly userModel;
    private readonly mailerService;
    private readonly logger;
    constructor(passwordResetModel: Model<PasswordReset>, userModel: Model<User>, mailerService: MailerService);
    generateResetToken(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
