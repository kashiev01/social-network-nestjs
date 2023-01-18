import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from 'utils/database.config';

@Module({
  imports: [
    UsersModule,
    SubscriptionsModule,
    PostsModule,
    TypeOrmModule.forRoot(DataSourceOption),
  ],
})
export class AppModule {}
