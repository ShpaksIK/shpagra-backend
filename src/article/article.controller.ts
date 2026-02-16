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
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CreateReactionDto } from './dto/reaction.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ResponseMessage } from 'src/response/response.decorator';

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @ResponseMessage('Данные получены успешно')
  async getHomeArticles() {
    return await this.articleService.getHomeArticles();
  }

  @Get('/:articleId')
  @ResponseMessage('Данные получены успешно')
  async getFullArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getFullArticle(articleId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Статья создана успешно')
  async createArticle(
    @Body(ValidationPipe) dto: CreateArticleDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.createArticle(profileId, dto);
  }

  @Delete('/:articleId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Статья удалена успешно')
  async deleteArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.deleteArticle(articleId, profileId);
  }

  @Put('/:articleId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Статья обновлена успешно')
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body(ValidationPipe) dto: UpdateArticleDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.updateArticle(articleId, profileId, dto);
  }

  @Get('/:articleId/comments')
  @ResponseMessage('Данные получены успешно')
  async getComments(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getComments(articleId);
  }

  @Post('/:articleId/comments')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Комментарий создан успешно')
  async createComment(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body(ValidationPipe) dto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.createComment(articleId, profileId, dto);
  }

  @Put('/:articleId/comments/:commentId')
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

    return await this.articleService.updateComment(commentId, profileId, dto);
  }

  @Delete('/:articleId/comments/:commentId')
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

    return await this.articleService.deleteComment(commentId, profileId);
  }

  @Get('/:articleId/reactions')
  @ResponseMessage('Данные получены успешно')
  async getReactions(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getReactions(articleId);
  }

  @Post('/:articleId/reactions')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Реакция создана успешно')
  async createReaction(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body(ValidationPipe) dto: CreateReactionDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.createReaction(articleId, profileId, dto);
  }

  @Delete('/:articleId/reactions/:reactionId')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Реакция удалена успешно')
  async deleteReaction(
    @Param('reactionId', ParseIntPipe) reactionId: number,
    @Req() req: Request,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.deleteReaction(reactionId, profileId);
  }

  @Get('/:articleId/comments/:commentId/reactions')
  @ResponseMessage('Данные получены успешно')
  async getCommentReactions(
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.articleService.getCommentReactions(commentId);
  }

  @Post('/:articleId/comments/:commentId/reactions')
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

    return await this.articleService.createCommentReaction(
      commentId,
      profileId,
      dto,
    );
  }

  @Delete('/:articleId/comments/:commentId/reactions/:reactionId')
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

    return await this.articleService.deleteReaction(reactionId, profileId);
  }
}
