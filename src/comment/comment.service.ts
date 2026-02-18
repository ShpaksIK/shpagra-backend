import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from 'src/article/dto/comment.dto';
import { CreateReactionDto } from 'src/article/dto/reaction.dto';
import { DatabaseService } from 'src/database/database.provider';

@Injectable()
export class CommentService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

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

  async getCommentReactions(commentId: number) {
    const reactions = await this.databaseService.query(
      `SELECT id, content FROM reaction 
      WHERE id_entity = $1 AND type_entity = 'comment'`,
      [commentId],
    );

    return reactions.rows;
  }

  async createCommentReaction(
    commentId: number,
    profileId: number,
    dto: CreateReactionDto,
  ) {
    return this.databaseService.transaction(async (client) => {
      const reactionExists = await client.query(
        `SELECT id FROM reaction WHERE id_profile = $1 AND id_entity = $2 AND type_entity = 'comment'`,
        [profileId, commentId],
      );
      const reaction = reactionExists.rows[0];

      if (reaction) {
        await client.query(`DELETE FROM reaction WHERE id = $1`, [reaction.id]);
      }

      const newReaction = await this.databaseService.query(
        `INSERT INTO reaction (content, id_profile, type_entity, id_entity)
              VALUES ($1, $2, 'comment', $3)
              RETURNING id, content, id_entity, 
              (SELECT login FROM profile p WHERE p.id = id_profile) as author_login`,
        [dto.content, profileId, commentId],
      );

      return newReaction.rows[0];
    });
  }
}
