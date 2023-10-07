import { Module } from '@nestjs/common';

import { FundsDepositedModule } from './funds-deposited/fund-deposited.module';
import { FundsTransferredModule } from './funds-transferred/funds-transferred.module';
import { fundsWithdrawnModule } from './funds-withdrawn/funds-withdrawn.module';
import { FundsReceivedModule } from './funds-received/funds-received.module';

@Module({
  imports: [
    FundsDepositedModule,
    FundsReceivedModule,
    FundsTransferredModule,
    fundsWithdrawnModule,
  ],
})
export class ConsumerModule {}
