import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async getByLogin(login: string) {
    const result = await this.databaseService.query(
      'SELECT id, login, username, created_at FROM profile WHERE login = $1',
      [login],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Пользователь не найден');
    }

    return result.rows[0];
  }

  async getArticlesByLogin(login: string) {
    const result = await this.databaseService.query(
      `SELECT a.* FROM article a
      JOIN profile p ON a.id_profile = p.id
      WHERE p.login = $1`,
      [login],
    );
    return result.rows;
  }

  async getCommentsByLogin(login: string) {
    const result = await this.databaseService.query(
      `SELECT c.* FROM comment c
      JOIN profile p ON c.id_profile = p.id
      WHERE p.login = $1`,
      [login],
    );
    return result.rows;
  }

  async getReactionsByLogin(login: string) {
    const result = await this.databaseService.query(
      `SELECT r.* FROM reaction r
      JOIN profile p ON r.id_profile = p.id
      WHERE p.login = $1`,
      [login],
    );
    return result.rows;
  }
}
