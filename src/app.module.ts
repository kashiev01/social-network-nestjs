import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from 'utils/database.config';
import { APP_GUARD } from '@nestjs/core';
import { ValidEmailGuard } from './email.guard';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    SubscriptionsModule,
    PostsModule,
    TypeOrmModule.forRoot(DataSourceOption),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [{ provide: APP_GUARD, useClass: ValidEmailGuard }],
})
export class AppModule {}
