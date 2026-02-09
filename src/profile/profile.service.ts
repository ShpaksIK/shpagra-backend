import { Injectable, Inject } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
  ) {}

  async getAll() {
    const result = await this.databaseService.query('SELECT * FROM profile');
    return result.rows;
  }

  async getByLogin(login: string) {
    const result = await this.databaseService.query(
      'SELECT * FROM profile WHERE login = $1',
      [login],
    );
    return result.rows;
  }
}
