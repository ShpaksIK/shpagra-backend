import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from 'nestjs-mapped-types';

export class CreateCommentDto {
  @IsString()
  @MaxLength(2048)
  content: string;

  @IsNumber()
  @IsOptional()
  id_parent?: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
