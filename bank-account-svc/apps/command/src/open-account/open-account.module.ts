import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { BANK_FUNDS_COMMAND_SERVICE_NAME } from '@command/common/proto/bank-funds-command.pb';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@command/common/proto/bank-funds-query.pb';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

import { OpenAccountController } from './controllers/open-account.controller';
import { OpenAccountHandler } from './commands/open-account.handler';
import { AccountOpenedHandler } from './events/account-opened.handler';
import { OpenAccountSaga } from './sagas/open-account.saga';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: BANK_FUNDS_QUERY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('BANK_FUNDS_COMMAND_GRPC_URL'),
            package: BANK_FUNDS_COMMAND_SERVICE_NAME,
            protoPath:
              'node_modules/bank-shared-proto/proto/bank-funds-command.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OpenAccountController],
  providers: [
    OpenAccountHandler,
    AccountOpenedHandler,
    AccountEventProducer,
    EventSourcingHandler,
    OpenAccountSaga,
  ],
})
export class OpenAccountModule {}
