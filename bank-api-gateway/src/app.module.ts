import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundsModule } from './funds/funds.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [FundsModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
