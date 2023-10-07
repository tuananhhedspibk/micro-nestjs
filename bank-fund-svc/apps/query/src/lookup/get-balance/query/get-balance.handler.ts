import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { GetBalanceQuery } from './get-balance.query';

import { FundsRepository } from '@query/common/repository/funds.repository';
import { Funds } from '@query/common/entity/funds.entity';

@QueryHandler(GetBalanceQuery)
export class GetBalanceQueryHandler
  implements ICommandHandler<GetBalanceQuery>
{
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public execute(query: GetBalanceQuery): Promise<Funds> {
    return this.repository.findOne({ where: { id: query.id } });
  }
}
