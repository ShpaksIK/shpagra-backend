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
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ResponseMessage } from 'src/response/response.decorator';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Данные получены успешно')
  async getMe(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const login = user['login'];

    return await this.profileService.getByLogin(login);
  }

  @Get('/:profileLogin')
  @ResponseMessage('Данные получены успешно')
  async getByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getByLogin(login);
  }

  @Get('/:profileLogin/articles')
  @ResponseMessage('Данные получены успешно')
  async getArticlesByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getArticlesByLogin(login);
  }

  @Get('/:profileLogin/comments')
  @ResponseMessage('Данные получены успешно')
  async getCommentsByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getCommentsByLogin(login);
  }

  @Get('/:profileLogin/reactions')
  @ResponseMessage('Данные получены успешно')
  async getReactionsByLogin(@Param('profileLogin') login: string) {
    return await this.profileService.getReactionsByLogin(login);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Профиль изменен успешно')
  async updateProfile(
    @Body(ValidationPipe) dto: UpdateProfileFullDto,
    @Req() req: Request,
  ) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const profileId = user['profileId'];

    return await this.profileService.updateProfile(profileId, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Профиль удален успешно')
  async deleteProfile(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const profileId = user['profileId'];

    return await this.profileService.deleteProfile(profileId);
  }
}
