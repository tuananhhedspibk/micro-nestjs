import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CloseAccountController } from './controllers/close-account.controller';
import { CloseAccountHandler } from './commands/close-account.handler';
import { AccountClosedHandler } from './events/account-closed.handler';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

@Module({
  imports: [CqrsModule],
  controllers: [CloseAccountController],
  providers: [
    CloseAccountHandler,
    AccountClosedHandler,
    AccountEventProducer,
    EventSourcingHandler,
  ],
})
export class CloseAccountModule { }
