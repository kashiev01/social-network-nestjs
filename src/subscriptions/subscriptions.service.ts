import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubcriptionDto } from './dto/subscription.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getSubscriptions(): Promise<any> {
    return await this.subscriptionRepository.find();
  }

  async postSubscribe(email, subDto: SubcriptionDto) {
    const followeeEmail = subDto.email;

    const followee = await this.usersRepository.findOne({
      where: {
        email: followeeEmail,
      },
    });

    const follower = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (followee && follower) {
      return await this.subscriptionRepository.save({
        user: followee,
      });
    }
  }

  async deleteSubs(email) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return await this.subscriptionRepository.delete({
        // followerId: user.id,
      });
    }
  }
}
