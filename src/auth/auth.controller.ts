import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { ResponseMessage } from 'src/response/response.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('Успешная регистрация')
  async register(@Body(ValidationPipe) dto: RegisterDto) {
    await this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Успешный вход')
  async login(
    @Body(ValidationPipe) dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    const tokens = await this.authService.login(dto, userAgent, ip);

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      access_token: tokens.access_token,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Успешный выход')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    res.clearCookie('refresh_token');
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new BadRequestException('Токен не предоставлен');
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      access_token: tokens.access_token,
    };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
