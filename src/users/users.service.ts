import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update.profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(email): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    } else {
      return await this.usersRepository.save({ email: email });
    }
  }

  async updateUser(
    email,
    updateUserDto: UpdateProfileDto,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      await this.usersRepository.update({ email: email }, updateUserDto);
      return await this.usersRepository.findOne({
        where: { email: email },
      });
    }
  }
}
