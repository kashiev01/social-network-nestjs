import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { PostEntity } from './entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPost(
    @Param('email') email,
    @Body() postDto: PostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(email, postDto);
  }

  @Get()
  async getPosts(
    @Param('email') email,
    @Query('dateTime') dateTime,
  ): Promise<PostEntity> {
    return await this.postService.getPosts(email, dateTime);
  }
}
