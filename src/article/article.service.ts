import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { CreateReactionDto } from './dto/reaction.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async getFullArticle(articleId: number) {
    const article = await this.databaseService.query(
      'SELECT * FROM article WHERE id = $1 AND deleted_at IS NULL',
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

  async getComments(articleId: number) {
    const comments = await this.databaseService.query(
      `SELECT c.id, c.content, c.created_at, c.updated_at, c.id_parent,
      p.login, p.username FROM comment c
      JOIN profile p ON c.id_profile = p.id
      WHERE c.id_entity = $1 AND c.type_entity = 'article' AND c.deleted_at IS NULL`,
      [articleId],
    );

    return comments.rows;
  }

  async createComment(
    articleId: number,
    profileId: number,
    dto: CreateCommentDto,
  ) {
    await this.databaseService.query(
      `INSERT INTO comment (content, id_profile, type_entity, id_entity, id_parent)
            VALUES ($1, $2, 'article', $3, $4)`,
      [dto.content, profileId, articleId, dto.id_parent || null],
    );
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

  async deleteComment(commentId: number, profileId: number) {
    const comment = await this.databaseService.query(
      `UPDATE comment SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND id_profile = $2
            AND deleted_at IS NULL
        RETURNING id`,
      [commentId, profileId],
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
}
