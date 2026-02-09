import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.provider';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload, Tokens } from './types/tokens.type';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async getMe() {
    return this.databaseService.query(
      'SELECT id, login, username, created_at WHERE login',
    );
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.databaseService.query(
      'SELECT id FROM profile WHERE login = $1',
      [dto.login],
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictException(
        'Пользователь с таким логином уже зарегистрирован',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.databaseService.query(
      'INSERT INTO profile (login, password, username) VALUES ($1, $2, $3)',
      [dto.login, hashedPassword, dto.username],
    );
  }

  async login(dto: LoginDto, userAgent?: string, ip?: string): Promise<Tokens> {
    const result = await this.databaseService.query(
      'SELECT id, login, password FROM profile WHERE login = $1',
      [dto.login],
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const profile = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      profile.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const tokens = await this.generateTokens(profile.id, profile.login);
    await this.saveRefreshToken(
      profile.id,
      tokens.refresh_token,
      userAgent,
      ip,
    );

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.databaseService.query(
      'DELETE FROM sessions WHERE refresh_token = $1',
      [refreshToken],
    );
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    try {
      const sessionResult = await this.databaseService.query(
        `SELECT s.*, p.login
                FROM sessions s
                JOIN profile p ON s.profile_id = p.id
                WHERE s.refresh_token = $1 AND s.expires_at > NOW()`,
        [refreshToken],
      );

      if (sessionResult.rows.length === 0) {
        throw new ForbiddenException('Неверный токен');
      }

      const session = sessionResult.rows[0];

      await this.databaseService.query(
        'DELETE FROM sessions WHERE refresh_token = $1',
        [refreshToken],
      );

      const tokens = await this.generateTokens(
        session.profile_id,
        session.login,
      );

      await this.saveRefreshToken(
        session.profile_id,
        tokens.refresh_token,
        session.user_agent,
        session.ip_address,
      );

      return tokens;
    } catch (error) {
      throw new ForbiddenException('Неверный токен');
    }
  }

  private async generateTokens(
    profileId: number,
    login: string,
  ): Promise<Tokens> {
    const payload: JwtPayload = { sub: profileId, login };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  private async saveRefreshToken(
    profileId: number,
    refreshToken: string,
    userAgent?: string,
    ip?: string,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.databaseService.query(
      `INSERT INTO sessions (profile_id, refresh_token, user_agent, ip_address, expires_at)
            VALUES ($1, $2, $3, $4, $5)`,
      [profileId, refreshToken, userAgent, ip, expiresAt],
    );
  }

  async validateProfile(profileId: number) {
    const result = await this.databaseService.query(
      'SELECT id, login FROM profile WHERE id = $1',
      [profileId],
    );
    return result.rows[0] || null;
  }
}
