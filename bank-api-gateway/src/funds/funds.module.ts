import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BANK_FUNDS_COMMAND_PACKAGE_NAME,
  BANK_FUNDS_COMMAND_SERVICE_NAME,
} from './proto/bank-funds-command.pb';
import {
  BANK_FUNDS_QUERY_PACKAGE_NAME,
  BANK_FUNDS_QUERY_SERVICE_NAME,
} from './proto/bank-funds-query.pb';
import { BankFundsController } from './funds.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BANK_FUNDS_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
          protoPath:
            'node_modules/bank-shared-proto/proto/bank-funds-command.proto',
        },
      },
      {
        name: BANK_FUNDS_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: BANK_FUNDS_QUERY_PACKAGE_NAME,
          protoPath:
            'node_modules/bank-shared-proto/proto/bank-funds-query.proto',
        },
      },
    ]),
  ],
  controllers: [BankFundsController],
})
export class FundsModule {}
