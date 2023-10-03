import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from '@query/common/repository/account.repository';
import { AccountConsumer } from './consumer/account-closed.consumer';
import { AccountCloseHandler } from './event/account-closed.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE' }]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountConsumer],
  providers: [AccountCloseHandler],
})
export class AccountClosedModule { }
