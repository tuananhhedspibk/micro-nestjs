import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FundsDepositedEvent } from '@shared/events';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler
  implements IEventHandler<FundsDepositedEvent>
{
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsDepositedEvent): void {
    const { constructor }: FundsDepositedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
