import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CreateReactionDto } from './dto/reaction.dto';
import { CommentsFilterType } from 'src/types/comment.type';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async getHomeArticles() {
    const articles = await this.databaseService.query(
      `SELECT 
    a.id, a.title, a.description, a.created_at, a.updated_at, 
    p.login as author_login, p.username as author_username,
    (SELECT COUNT(*)::integer FROM comment c WHERE c.id_entity = a.id AND c.type_entity = 'article' AND c.deleted_at IS NULL) as comments_length,
    (SELECT COUNT(*)::integer FROM reaction r WHERE r.id_entity = a.id AND r.type_entity = 'article') as reactions_length,
    COALESCE(
        (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', r.id, 'content', r.content, 'author_login', rp.login))
         FROM reaction r 
         JOIN profile rp ON r.id_profile = rp.id
         WHERE r.id_entity = a.id AND r.type_entity = 'article'),
        '[]'::json
    ) as reactions,
    '[]'::json as comments
FROM article a
JOIN profile p ON a.id_profile = p.id
WHERE a.deleted_at IS NULL AND a.status = 'public'`,
    );

    return articles.rows;
  }

  async getFullArticle(articleId: number) {
    const article = await this.databaseService.query(
      `SELECT a.id, a.title, a.description, a.content, a.status,
      a.created_at, a.updated_at,
      p.login as author_login, p.username as author_username
      FROM article a
      JOIN profile p ON a.id_profile = p.id
      WHERE a.id = $1 AND a.deleted_at IS NULL AND a.status = 'public'`,
      [articleId],
    );

    if (article.rows.length === 0) {
      throw new NotFoundException('Статья не найдена');
    }

    return article.rows[0];
  }

  async createArticle(profileId: number, dto: CreateArticleDto) {
    await this.databaseService.query(
      `INSERT INTO article (title, description, content, status, id_profile)
            VALUES ($1, $2, $3, $4, $5)`,
      [
        dto.title,
        dto.description,
        JSON.stringify(dto.content),
        dto.status,
        profileId,
      ],
    );
  }

  async deleteArticle(articleId: number, profileId: number) {
    const article = await this.databaseService.query(
      `UPDATE article SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND id_profile = $2
            AND deleted_at IS NULL
        RETURNING id`,
      [articleId, profileId],
    );

    if (!article.rows[0]) {
      throw new NotFoundException('Статья не найдена');
    }
  }

  async updateArticle(
    articleId: number,
    profileId: number,
    dto: UpdateArticleDto,
  ) {
    const updateRows = Object.keys(dto)
      .map((row, i) => `${row} = $${i + 3}`)
      .join(', ');
    const updateValues = Object.values(dto).map((value) => {
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value;
    });

    const article = await this.databaseService.query(
      `UPDATE article SET ${updateRows},
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND id_profile = $2
            AND deleted_at IS NULL RETURNING id`,
      [articleId, profileId, ...updateValues],
    );

    if (!article.rows[0]) {
      throw new NotFoundException('Статья не найдена');
    }
  }

  async getComments(articleId: number, commentsFilter: CommentsFilterType) {
    const comments = await this.databaseService.query(
      `SELECT c.id, c.content, c.created_at, c.updated_at, c.id_parent,
      (SELECT pp.login 
        FROM comment cc 
        JOIN profile pp ON cc.id_profile = pp.id
        WHERE cc.id = c.id_parent
      ) as login_parent,
      (SELECT pp.username 
        FROM comment cc 
        JOIN profile pp ON cc.id_profile = pp.id
        WHERE cc.id = c.id_parent
      ) as username_parent,
      p.login as author_login, p.username as author_username, 'article' as related_type,
	  COALESCE(
        (SELECT JSON_AGG(JSON_BUILD_OBJECT('id', r.id, 'content', r.content, 'author_login', rp.login))
         FROM reaction r 
         JOIN profile rp ON r.id_profile = rp.id
         WHERE r.id_entity = c.id AND r.type_entity = 'comment'),
        '[]'::json
    ) as reactions
      FROM comment c
      JOIN profile p ON c.id_profile = p.id
      WHERE c.id_entity = $1 AND c.type_entity = 'article' AND c.deleted_at IS NULL
      ORDER BY 
      CASE 
        WHEN $2 = 'new' THEN EXTRACT(EPOCH FROM c.created_at)
        WHEN $2 = 'old' THEN EXTRACT(EPOCH FROM c.created_at)
        WHEN $2 = 'positive' THEN (
          SELECT COUNT(*) 
          FROM reaction r 
          WHERE r.id_entity = c.id AND r.type_entity = 'comment' AND r.content = 'like'
        )
        WHEN $2 = 'negative' THEN (
          SELECT COUNT(*) 
          FROM reaction r 
          WHERE r.id_entity = c.id AND r.type_entity = 'comment' AND r.content = 'dislike'
        )
      END
      ${commentsFilter === 'old' ? 'ASC' : 'DESC'};`,
      [articleId, commentsFilter],
    );

    return comments.rows;
  }

  async createComment(
    articleId: number,
    profileId: number,
    dto: CreateCommentDto,
  ) {
    const comment = await this.databaseService.query(
      `WITH inserted_comment AS (
        INSERT INTO comment (content, id_profile, type_entity, id_entity, id_parent)
        VALUES ($1, $2, 'article', $3, $4)
        RETURNING id, content, created_at, updated_at, id_profile, id_parent
      )
      SELECT 
        ic.id, 
        ic.content, 
        ic.created_at, 
        ic.updated_at, 
        ic.id_parent,
        (SELECT pp.login 
          FROM comment cc 
          JOIN profile pp ON cc.id_profile = pp.id
          LIMIT 1
        ) as login_parent,
        p.login as author_login, 
        p.username as author_username,  
        'article' as related_type,
        '[]'::json as reactions
      FROM inserted_comment ic
      JOIN profile p ON ic.id_profile = p.id`,
      [dto.content, profileId, articleId, dto.id_parent || null],
    );

    return comment.rows[0];
  }

  async updateComment(
    commentId: number,
    profileId: number,
    dto: UpdateCommentDto,
  ) {
    const updateRows = Object.keys(dto)
      .map((row, i) => `${row} = $${i + 3}`)
      .join(', ');
    const updateValues = Object.values(dto);

    const comment = await this.databaseService.query(
      `UPDATE comment SET ${updateRows},
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND id_profile = $2
            AND deleted_at IS NULL RETURNING id`,
      [commentId, profileId, ...updateValues],
    );

    if (!comment.rows[0]) {
      throw new NotFoundException('Комментарий не найден');
    }
  }

  async getReactions(articleId: number) {
    const reactions = await this.databaseService.query(
      `SELECT id, content FROM reaction 
      WHERE id_entity = $1 AND type_entity = 'article'`,
      [articleId],
    );

    return reactions.rows;
  }

  async createReaction(
    articleId: number,
    profileId: number,
    dto: CreateReactionDto,
  ) {
    return this.databaseService.transaction(async (client) => {
      const reactionExists = await client.query(
        `SELECT id FROM reaction WHERE id_profile = $1 AND id_entity = $2 AND type_entity = 'article'`,
        [profileId, articleId],
      );
      const reaction = reactionExists.rows[0];

      if (reaction) {
        await client.query(`DELETE FROM reaction WHERE id = $1`, [reaction.id]);
      }

      const newReaction = await this.databaseService.query(
        `INSERT INTO reaction (content, id_profile, type_entity, id_entity)
              VALUES ($1, $2, 'article', $3) RETURNING id, content, (SELECT p.login FROM profile p WHERE p.id = id_profile) as author_login`,
        [dto.content, profileId, articleId],
      );

      return newReaction.rows[0];
    });
  }
}
