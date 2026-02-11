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

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/:articleId')
  async getFullArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.articleService.getFullArticle(articleId);
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
}
