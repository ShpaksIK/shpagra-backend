import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/response/response.decorator';
import type { Request } from 'express';

@Controller('api/reactions')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @Delete('/:reactionId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Реакция удалена успешно')
  async deleteCommentReaction(
    @Param('reactionId', ParseIntPipe) reactionId: number,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.reactionService.deleteReaction(reactionId, profileId);
  }
}
