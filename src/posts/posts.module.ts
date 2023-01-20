import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { ValidEmailGuard } from 'src/email.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, SubscriptionEntity]),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
