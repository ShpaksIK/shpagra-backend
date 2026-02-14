import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  login: string;

  @IsString()
  @MinLength(5)
  @MaxLength(256)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  username: string;
}
