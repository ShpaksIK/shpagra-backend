import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';
import { UpdateProfileFullDto } from './dto/profile.dto';

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
      WHERE p.login = $1 AND p.deleted_at IS NULL`,
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

  async updateProfile(profileId: number, dto: UpdateProfileFullDto) {
    return await this.databaseService.transaction(async (client) => {
      const updateProfileRows = Object.keys(dto.profile || {})
        .map((row, i) => `${row} = $${i + 2}`)
        .join(', ');
      const updateProfileValues = Object.values(dto.profile || {});

      let updateProfileQuery = `UPDATE profile p SET ${updateProfileRows},
        updated_at = CURRENT_TIMESTAMP
        WHERE p.id = $1 AND p.deleted_at IS NULL
        RETURNING p.id, p.login, p.username, p.created_at`;
      if (!updateProfileRows) {
        updateProfileQuery = `UPDATE profile p
          SET updated_at = CURRENT_TIMESTAMP
          WHERE p.id = $1 AND p.deleted_at IS NULL
          RETURNING p.id, p.login, p.username, p.created_at`;
      }

      const updatedProfile = await client.query(updateProfileQuery, [
        profileId,
        ...updateProfileValues,
      ]);

      if (updatedProfile.rows.length === 0) {
        throw new ConflictException('Пользователь был удален');
      }

      const updateProfileSettingsRows = Object.keys(dto.settings || {})
        .map((row, i) => `${row} = $${i + 2}`)
        .join(', ');

      if (!updateProfileSettingsRows) {
        return {
          ...updatedProfile.rows[0],
        };
      }

      const updateProfileSettingsValues = Object.values(dto.settings || {});

      const updatedProfileSettings = await client.query(
        `UPDATE profile_settings ps SET ${updateProfileSettingsRows}
        WHERE ps.id_profile = $1
        RETURNING ps.is_visible_articles, ps.is_visible_comments, ps.is_visible_reactions`,
        [profileId, ...updateProfileSettingsValues],
      );

      return {
        ...updatedProfile.rows[0],
        ...updatedProfileSettings.rows[0],
      };
    });
  }

  async deleteProfile(profileId: number) {
    const deletedProfile = await this.databaseService.query(
      'UPDATE profile SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 AND deleted_at IS NULL RETURNING id',
      [profileId],
    );

    if (deletedProfile.rows.length === 0) {
      throw new ConflictException('Пользователь был удален ранее');
    }
  }
}
