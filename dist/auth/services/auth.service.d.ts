import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    validateUser(userId: string): Promise<User>;
}
