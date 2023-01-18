import { Body, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { UserEntity } from './entities/user.entity';
import { Post } from '@nestjs/common/decorators';

@Controller('profile')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async createUser(@Param('email') email): Promise<UserEntity> {
    return await this.userService.createUser(email);
  }

  @Post()
  async updateUser(
    @Param('email') email,
    @Body() updateUserDto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(email, updateUserDto);
  }
}
