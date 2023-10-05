import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from '@command/common/proto/bank-account-query.pb';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

import { TransferFundsController } from './controllers/transfer-funds.controller';
import { TransferFundsHandler } from './commands/transfer-funds.handler';
import { FundsTransferredHandler } from './events/funds-transferred.handler';
import { TransferFundsSaga } from './sagas/transfer-funds.saga';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
          protoPath:
            'node_modules/bank-shared-proto/proto/bank-account-query.proto',
        },
      },
    ]),
  ],
  controllers: [TransferFundsController],
  providers: [
    TransferFundsHandler,
    FundsTransferredHandler,
    AccountEventProducer,
    EventSourcingHandler,
    TransferFundsSaga,
  ],
})
export class TransferFundsModule { }
