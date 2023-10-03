import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { FindAccountQuery } from './find-account.query';

import { AccountRepository } from '@query/common/repository/account.repository';
import { Account } from '@query/common/entity/account.entity';

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler
  implements IQueryHandler<FindAccountQuery>
{
  @InjectRepository(AccountRepository)
  private readonly repository: AccountRepository;

  public execute(query: FindAccountQuery): Promise<Account> {
    return this.repository.findOne({ where: { id: query.id } });
  }
}
