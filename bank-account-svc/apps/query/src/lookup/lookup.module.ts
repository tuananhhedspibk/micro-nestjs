import { Module } from '@nestjs/common';

import { FindAllAccountsModule } from './find-all-accounts/find-all-accounts.module';
import { FindAccountModule } from './find-account/find-account.module';

@Module({
  imports: [FindAllAccountsModule, FindAccountModule],
})
export class LookupModule { }
