import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FundsTransferredEvent } from '@shared/events';
import { plainToInstance } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsTransferredConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsTransferredEvent')
  private fundsTransferred(@Payload() { value }: KafkaMessage): void {
    const event: FundsTransferredEvent = plainToInstance(
      FundsTransferredEvent,
      value,
    );

    this.eventBus.publish(event);
  }
}
