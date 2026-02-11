import { IsString, MaxLength } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @MaxLength(1)
  content: string;
}
