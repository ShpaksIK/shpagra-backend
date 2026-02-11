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
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CreateReactionDto } from './dto/reaction.dto';

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/:articleId')
  async getFullArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getFullArticle(articleId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(@Body() dto: CreateArticleDto, @Req() req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }
    const profileId = user['profileId'];

    return await this.articleService.createArticle(profileId, dto);
  }

  @Delete('/:articleId')
  @UseGuards(JwtAuthGuard)
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
  async updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() dto: UpdateArticleDto,
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
  async getComments(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getComments(articleId);
  }

  @Post('/:articleId/comments')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() dto: CreateCommentDto,
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
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: UpdateCommentDto,
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
  async getReactions(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articleService.getReactions(articleId);
  }

  @Post('/:articleId/reactions')
  @UseGuards(JwtAuthGuard)
  async createReaction(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() dto: CreateReactionDto,
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
}
