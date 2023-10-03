import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountRepository } from '@query/common/repository/account.repository';
import { AccountOpenedConsumer } from './consumer/account-opened.consumer';
import { AccountOpenedHandler } from '@command/open-account/events/account-opened.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      { name: 'KAFKA_SERVICE', transport: Transport.KAFKA },
    ]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountOpenedConsumer],
  providers: [AccountOpenedHandler],
})
export class AccountOpenedModule { }
