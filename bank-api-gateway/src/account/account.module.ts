import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
} from './proto/account-command.pb';
import { BankAccountController } from './account.controller';
import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from './proto/account-query.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BANK_ACCOUNT_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
          protoPath:
            'node_modules/bank-shared-proto/proto/bank-account-command.proto',
        },
      },
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
          protoPath:
            'node_modules/bank-shared-proto/proto/bank-account-query.proto',
        },
      },
    ]),
  ],
  controllers: [BankAccountController],
})
export class AccountModule {}
