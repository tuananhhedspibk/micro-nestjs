import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllAccountsQuery } from './find-all-accounts.query';
import { FindAllAccountsResponseData } from '@query/common/proto/bank-account-query.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '@query/common/repository/account.repository';
import { Account } from '@query/common/entity/account.entity';

@QueryHandler(FindAllAccountsQuery)
export class FindAllAccountsQueryHandler
  implements IQueryHandler<FindAllAccountsResponseData>
{
  @InjectRepository(AccountRepository)
  private readonly repository: AccountRepository;

  public async execute(
    query: FindAllAccountsQuery,
  ): Promise<FindAllAccountsResponseData> {
    const take: number = 15;
    const total: number = await this.repository.count();
    const pageLength: number = Math.ceil(total / take) || 1;
    const page: number = query.page > pageLength ? 1 : query.page;
    const skip: number = page > 1 ? take * (page - 1) : 0;
    const accounts: Account[] = await this.repository.find({
      skip,
      take,
      select: ['id', 'holder', 'isActive'],
    });

    return { accounts, page, total, count: accounts.length };
  }
}
