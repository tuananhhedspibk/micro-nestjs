import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';

import { FundsTransferredEvent } from '@shared/events';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler
  implements IEventHandler<FundsTransferredEvent>
{
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsTransferredEvent): void {
    const { constructor }: FundsTransferredEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
