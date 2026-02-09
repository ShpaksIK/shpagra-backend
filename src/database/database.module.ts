import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.provider';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(options): DynamicModule {
    const databaseProvider: Provider = {
      provide: DatabaseService,
      useFactory: () => {
        return new DatabaseService(options);
      },
    };

    return {
      module: DatabaseModule,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };
  }
}
