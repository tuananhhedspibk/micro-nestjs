import { plainToInstance } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FundsReceivedEvent } from '@shared/events/funds-received.event';

@Controller()
export class FundsReceivedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsReceivedEvent')
  private fundsReceived(@Payload() { value }: KafkaMessage): void {
    const event: FundsReceivedEvent = plainToInstance(
      FundsReceivedEvent,
      value,
    );

    this.eventBus.publish(event);
  }
}
