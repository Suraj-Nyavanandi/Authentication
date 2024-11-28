// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordResetService } from './services/password-reset.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordReset, PasswordResetSchema } from './schemas/password-reset.schema';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordResetService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
