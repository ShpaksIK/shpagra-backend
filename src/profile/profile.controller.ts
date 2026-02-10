import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileFullDto } from './dto/profile.dto';

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

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() dto: UpdateProfileFullDto, @Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const profileId = user['profileId'];

    return await this.profileService.updateProfile(profileId, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const profileId = user['profileId'];

    return await this.profileService.deleteProfile(profileId);
  }
}
