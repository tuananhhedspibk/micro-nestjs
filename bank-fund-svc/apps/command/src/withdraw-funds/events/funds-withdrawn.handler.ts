import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';

import { FundsWithdrawnEvent } from '@shared/events';

@EventsHandler(FundsWithdrawnEvent)
export class FundsWithdrawnHandler
  implements IEventHandler<FundsWithdrawnEvent>
{
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsWithdrawnEvent): void {
    const { constructor }: FundsWithdrawnEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
