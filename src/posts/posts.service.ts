import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { PostEntity } from './entities/posts.entity';
import { PostDto } from './dto/post.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createPost(email, postDto: PostDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return await this.postsRepository.save({
        message: postDto.message,
        userId: user.id,
      });
    }
  }

  async getPosts(email, dateTime): Promise<any> {
    const follower = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    const followee = await this.usersRepository.find();

    const arrOfIds = followee.map((obj) => {
      return obj.id;
    });

    if (follower && dateTime) {
      return await this.postsRepository.find({
        where: {
          userId: In([follower.id, ...arrOfIds]),
          createDateTime: MoreThanOrEqual(dateTime),
        },
        order: { createDateTime: 'DESC' },
      });
    } else if (follower) {
      return await this.postsRepository.find({
        where: { userId: In([follower.id, ...arrOfIds]) },
        take: 20,
        order: { createDateTime: 'DESC' },
      });
    }
  }
}
