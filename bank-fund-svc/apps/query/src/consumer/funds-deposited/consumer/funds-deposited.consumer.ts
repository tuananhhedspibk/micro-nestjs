import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { plainToInstance } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { FundsDepositedEvent } from '@shared/events';

@Controller()
export class FundsDepositedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsDepositedEvent')
  private fundsDeposited(@Payload() { value }: KafkaMessage): void {
    const event: FundsDepositedEvent = plainToInstance(
      FundsDepositedEvent,
      value,
    );

    this.eventBus.publish(event);
  }
}
