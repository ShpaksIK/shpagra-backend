import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';

@Injectable()
export class ReactionService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async deleteReaction(reactionId: number, profileId: number) {
    const reaction = await this.databaseService.query(
      `DELETE FROM reaction WHERE id = $1 AND id_profile = $2 RETURNING id`,
      [reactionId, profileId],
    );

    if (!reaction.rows[0]) {
      throw new NotFoundException('Реакция не найдена');
    }
  }
}
