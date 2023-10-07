import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FundsDepositedEvent } from '@shared/events';
import { FundsRepository } from '../../../common/repository/funds.repository';
import { Funds } from '../../../common/entity/funds.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler
  implements IEventHandler<FundsDepositedEvent>
{
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsDepositedEvent): Promise<void> {
    if (event.version === 0) {
      const funds: Funds = new Funds();

      funds.id = event.id;
      funds.balance = event.amount;

      await this.repository.save(funds);

      return;
    }

    const funds: Funds = await this.repository.findOne({
      where: { id: event.id },
    });

    if (!funds) {
      throw new HttpException('No Account Found', HttpStatus.NO_CONTENT);
    }

    await this.repository.update(funds.id, {
      balance: funds.balance + event.amount,
    });
  }
}
