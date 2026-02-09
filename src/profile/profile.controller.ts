import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const login = user['login'];

    return await this.profileService.getByLogin(login);
  }

  @Get('/:profileLogin')
  async getByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getByLogin(login);
  }

  @Get('/:profileLogin/articles')
  async getArticlesByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getArticlesByLogin(login);
  }

  @Get('/:profileLogin/comments')
  async getCommentsByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getCommentsByLogin(login);
  }

  @Get('/:profileLogin/reactions')
  async getReactionsByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getReactionsByLogin(login);
  }
}
