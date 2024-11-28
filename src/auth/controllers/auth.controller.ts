// src/auth/controllers/auth.controller.ts

import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
  import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
  import { AuthService } from '../services/auth.service';
  import { PasswordResetService } from '../services/password-reset.service';
  import { RegisterDto } from '../dtos/register.dto';
  import { LoginDto } from '../dtos/login.dto';
  import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
  import { ResetPasswordDto } from '../dtos/reset-password.dto';
  import { JwtAuthGuard } from '../guards/jwt.guard';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly passwordResetService: PasswordResetService,
    ) {}
  
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto.email, registerDto.password);
    }
  
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
      try {
        const { token } = await this.authService.login(loginDto.email, loginDto.password);
        return { message: 'Login successful', token };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Post('validate')
    @ApiOperation({ summary: 'Validate a JWT token' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async validate(@Request() req) {
      return req.user;
    }
  
    @Post('forgot-password')
    @ApiOperation({ summary: 'Send password reset email' })
    @ApiBody({ type: ForgotPasswordDto })
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
      await this.passwordResetService.generateResetToken(forgotPasswordDto.email);
      return { message: 'Password reset email sent' };
    }
  
    @Post('reset-password')
    @ApiOperation({ summary: 'Reset password using token' })
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      await this.passwordResetService.resetPassword(
        resetPasswordDto.token,
        resetPasswordDto.newPassword,
      );
      return { message: 'Password successfully reset' };
    }
  }
  