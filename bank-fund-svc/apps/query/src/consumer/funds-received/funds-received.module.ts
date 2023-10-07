import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FundsReceivedConsumer } from './consumer/funds-received.consumer';
import { FundsReceivedHandler } from './event/funds-received.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      { name: 'KAFKA_SERVICE', transport: Transport.KAFKA },
    ]),
  ],
  controllers: [FundsReceivedConsumer],
  providers: [FundsReceivedHandler],
})
export class FundsReceivedModule {}
