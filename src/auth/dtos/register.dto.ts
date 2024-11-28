// src/auth/dtos/register.dto.ts

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
