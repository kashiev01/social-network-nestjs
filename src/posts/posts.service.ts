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
    @InjectRepository(SubscriptionEntity)
    private readonly subsRepository: Repository<SubscriptionEntity>,
  ) {}

  async createPost(email, postDto: PostDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return await this.postsRepository.save({
        message: postDto.message,
        user: user,
      });
    }
  }

  async getPosts(email, dateTime): Promise<any> {
    const follower = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    const a = await this.subsRepository.find();

    const followee = await this.usersRepository.find();

    const arrOfIds = a.map((obj) => {
      return obj.id;
    });

    if (follower && dateTime) {
      return await this.postsRepository.find({
        where: {
          user: In([follower.id, ...arrOfIds]),
          createDateTime: MoreThanOrEqual(dateTime),
        },
        order: { createDateTime: 'DESC' },
      });
    } else if (follower) {
      return await this.postsRepository.find({
        where: { user: In([follower.id, ...arrOfIds]) },
        take: 20,
        order: { createDateTime: 'DESC' },
      });
    }
  }
}
