import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PartialType } from 'nestjs-mapped-types';

class UpdateProfile {
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

export class UpdateProfileDto extends PartialType(UpdateProfile) {}

class UpdateProfileSettings {
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

export class UpdateProfileSettingsDto extends PartialType(
  UpdateProfileSettings,
) {}

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
