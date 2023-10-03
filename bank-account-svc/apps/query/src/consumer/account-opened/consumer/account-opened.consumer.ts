import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountOpenedEvent } from '@shared/events';
import { plainToInstance } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AccountOpenedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('AccountOpenedEvent')
  private consume(@Payload() { value }: KafkaMessage): void {
    const event: AccountOpenedEvent = plainToInstance(
      AccountOpenedEvent,
      value,
    );

    this.eventBus.publish(event);
  }
}
