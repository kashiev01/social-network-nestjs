import { Controller, Get, Body, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubcriptionDto } from './dto/subscription.dto';
import { ValidEmailGuard } from 'src/email.guard';

@Controller('subscribe')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Get()
  async getSubscriptions(): Promise<SubscriptionEntity> {
    return await this.subscriptionService.getSubscriptions();
  }

  @Post()
  async postSubscribe(
    @Param('email') email,
    @Body() subsDto: SubcriptionDto,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionService.postSubscribe(email, subsDto);
  }

  @Delete()
  async deleteSubs(@Param('email') email): Promise<any> {
    return await this.subscriptionService.deleteSubs(email);
  }
}
