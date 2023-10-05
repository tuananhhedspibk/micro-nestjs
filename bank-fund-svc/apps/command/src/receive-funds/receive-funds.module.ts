import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { ReceiveFundsHandler } from './commands/receive-funds.handler';
import { FundsReceivedHandler } from './events/funds-received.handler';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@Module({
  imports: [CqrsModule],
  providers: [
    ReceiveFundsHandler,
    FundsReceivedHandler,
    AccountEventProducer,
    EventSourcingHandler,
  ],
})
export class ReceiveFundsModule { }
