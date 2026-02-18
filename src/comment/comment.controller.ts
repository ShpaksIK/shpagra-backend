import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/response/response.decorator';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { UpdateCommentDto } from 'src/article/dto/comment.dto';
import type { Request } from 'express';
import { CreateReactionDto } from 'src/article/dto/reaction.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private commentSerivce: CommentService) {}

  @Put('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Комментарий обновлен успешно')
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body(ValidationPipe) dto: UpdateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.commentSerivce.updateComment(commentId, profileId, dto);
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Комментарий удален успешно')
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.commentSerivce.deleteComment(commentId, profileId);
  }

  @Get('/:commentId/reactions')
  @ResponseMessage('Данные получены успешно')
  async getCommentReactions(
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.commentSerivce.getCommentReactions(commentId);
  }

  @Post('/:commentId/reactions')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Реакция создана успешно')
  async createCommentReaction(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body(ValidationPipe) dto: CreateReactionDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.commentSerivce.createCommentReaction(
      commentId,
      profileId,
      dto,
    );
  }
}
