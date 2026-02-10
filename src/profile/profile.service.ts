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
      `SELECT p.id, p.login, p.username, p.created_at,
        ps.is_visible_articles, ps.is_visible_comments,
        ps.is_visible_reactions
      FROM profile p
      JOIN profile_settings ps ON p.id = ps.id_profile
      WHERE p.login = $1`,
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
