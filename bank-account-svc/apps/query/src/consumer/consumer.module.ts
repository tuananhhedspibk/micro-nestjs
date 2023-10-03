import { Module } from '@nestjs/common';
import { AccountOpenedModule } from './account-opened/account-opened.module';
import { AccountClosedModule } from './account-closed/account-closed.module';

@Module({ imports: [AccountOpenedModule, AccountClosedModule] })
export class ConsumerModule { }
