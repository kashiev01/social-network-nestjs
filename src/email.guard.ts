import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ValidEmailGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    console.log(isPublic);
    const request = context.switchToHttp().getRequest<Request>();

    const user = await this.usersRepository.findOneBy({
      email: String(request.params.email),
    });

    console.log(user);
    if (user.id === 1 || isPublic) {
      return true;
    } else {
      throw new ForbiddenException();
    }
  }
}
