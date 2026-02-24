import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { CreateCommentDto } from './dto/comment.dto';
import { CreateReactionDto } from './dto/reaction.dto';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ResponseMessage } from 'src/response/response.decorator';
import type { CommentsFilterType } from 'src/types/comment.type';

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
  async getComments(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Query('sort') commentsFilter: CommentsFilterType,
  ) {
    return await this.articleService.getComments(articleId, commentsFilter);
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
}
