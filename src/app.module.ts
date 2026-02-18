import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { databaseConfig } from './config/database.config';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validation/validation.pipe';
import { CommentModule } from './comment/comment.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule.forRoot({
      config: databaseConfig(),
    }),
    ProfileModule,
    AuthModule,
    ArticleModule,
    CommentModule,
    ReactionModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
