import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  login?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  username?: string;
}

export class UpdateProfileSettingsDto {
  @IsOptional()
  @IsBoolean()
  is_visible_articles?: boolean;

  @IsOptional()
  @IsBoolean()
  is_visible_comments?: boolean;

  @IsOptional()
  @IsBoolean()
  is_visible_reactions?: boolean;
}

export class UpdateProfileFullDto {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile?: UpdateProfileDto;

  @ValidateNested()
  @Type(() => UpdateProfileSettingsDto)
  @IsOptional()
  settings?: UpdateProfileSettingsDto;
}
