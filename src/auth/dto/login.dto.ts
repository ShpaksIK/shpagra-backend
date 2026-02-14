import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  login: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  currentPassword: string;
}
