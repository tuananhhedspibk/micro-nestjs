import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from '@command/common/proto/bank-account-query.pb';

import { DepositFundsController } from './controllers/deposit-funds.controller';
import { DepositFundsHandler } from './commands/deposit-funds.handler';
import { FundsDepositedHandler } from './events/funds-deposited.handler';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('BANK_ACCOUNT_QUERY_GRPC_URL'),
            package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
            protoPath:
              'node_modules/bank-shared-proto/proto/bank-account-query.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [DepositFundsController],
  providers: [
    DepositFundsHandler,
    FundsDepositedHandler,
    AccountEventProducer,
    EventSourcingHandler,
  ],
})
export class DepositFundsModule { }
