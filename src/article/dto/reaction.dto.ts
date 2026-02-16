import { IsString, MaxLength } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  content: string;
}
