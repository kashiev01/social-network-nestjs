import { Body, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { UserEntity } from './entities/user.entity';
import { Post } from '@nestjs/common/decorators';
import { Public } from './public.decorator';
import { ValidEmailGuard } from 'src/email.guard';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Get('profile')
  async createUser(@Param('email') email): Promise<UserEntity> {
    return await this.userService.createUser(email);
  }

  @Post('profile')
  async updateUser(
    @Param('email') email,
    @Body() updateUserDto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(email, updateUserDto);
  }
}
