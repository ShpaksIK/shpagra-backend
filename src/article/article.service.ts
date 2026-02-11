import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

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
    const article = await this.databaseService.query(
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
    return article.rows[0];
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
}
