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

  async getMe(login: string) {
    const result = await this.databaseService.query(
      `SELECT p.id, p.login, p.username, p.created_at,
	ps.is_visible_articles, ps.is_visible_comments,
	ps.is_visible_reactions,
	COALESCE(
		(SELECT JSON_AGG(JSON_BUILD_OBJECT(
			'id', a.id, 
			'title', a.title, 
			'description', a.description, 
			'created_at', a.created_at, 
			'updated_at', a.updated_at, 
			'author_login', ap.login, 
			'author_username', ap.username,
			'comments_length', (SELECT COUNT(*)::integer FROM comment ac WHERE ac.id_entity = a.id AND ac.type_entity = 'article' AND ac.deleted_at IS NULL),
      'comments', '[]'::json,
			'reactions_length', (SELECT COUNT(*)::integer FROM reaction ar WHERE ar.id_entity = a.id AND ar.type_entity = 'article'),
			'reactions', COALESCE(
				(SELECT JSON_AGG(JSON_BUILD_OBJECT(
					'id', r.id,
					'content', r.content,
					'author_login', rp.login
				))
				FROM reaction r
				JOIN profile rp ON r.id_profile = rp.id
				WHERE r.id_entity = a.id AND r.type_entity = 'article'),
				'[]'::json
		 )))
		 FROM article a 
		 JOIN profile ap ON a.id_profile = ap.id
		 WHERE a.id_profile = p.id AND a.deleted_at IS NULL),
		'[]'::json
	) as articles,
	COALESCE(
		(SELECT JSON_AGG(JSON_BUILD_OBJECT(
			'id', c.id, 
			'content', c.content, 
			'created_at', c.created_at, 
			'updated_at', c.updated_at,
			'related_type', c.type_entity,
			'author_login', p.login,
			'author_username', p.username,
			'id_parent', c.id_parent,
			'login_parent', (SELECT pp.login 
		        FROM comment cc 
		        JOIN profile pp ON cc.id_profile = pp.id
				WHERE cc.id = c.id_parent
		     ),
			 'username_parent', (SELECT pp.username 
		        FROM comment cc 
		        JOIN profile pp ON cc.id_profile = pp.id
				WHERE cc.id = c.id_parent
		     ),
			 'reactions', COALESCE(
				(SELECT JSON_AGG(JSON_BUILD_OBJECT(
					'id', r.id,
					'content', r.content,
					'author_login', rp.login
				))
				FROM reaction r
				JOIN profile rp ON r.id_profile = rp.id
				WHERE r.id_entity = c.id AND r.type_entity = 'comment'),
				'[]'::json
		 )))
		 FROM comment c 
		 JOIN profile cp ON c.id_profile = cp.id
		 WHERE c.id_profile = cp.id),
		'[]'::json
	) as comments,
	COALESCE(
		(SELECT JSON_AGG(JSON_BUILD_OBJECT(
			'id', r.id, 
			'content', r.content, 
			'author_login', rp.login, 
			'type_entity', r.type_entity
		 ))
		 FROM reaction r 
		 JOIN profile rp ON r.id_profile = rp.id
		 WHERE r.id_profile = p.id),
		'[]'::json
	) as reactions
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
