import { AuthService } from '../services/auth.service';
import { PasswordResetService } from '../services/password-reset.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly passwordResetService;
    constructor(authService: AuthService, passwordResetService: PasswordResetService);
    register(registerDto: RegisterDto): Promise<import("../schemas/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    validate(req: any): Promise<any>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
