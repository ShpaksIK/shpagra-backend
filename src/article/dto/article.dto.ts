import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PartialType } from 'nestjs-mapped-types';

class ContentItemDto {
  @IsString()
  type: 'title' | 'text' | 'image' | 'quote';

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  src?: string;
}

export class CreateArticleDto {
  @IsString()
  @MinLength(5)
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsString()
  status: 'draft' | 'moderation';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentItemDto)
  @ArrayMinSize(1)
  content: ContentItemDto[];
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
