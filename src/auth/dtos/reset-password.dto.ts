// src/auth/dtos/reset-password.dto.ts

import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Password reset token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'New password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
