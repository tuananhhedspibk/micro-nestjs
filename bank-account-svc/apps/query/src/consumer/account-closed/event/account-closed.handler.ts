import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@query/common/entity/account.entity';
import { AccountRepository } from '@query/common/repository/account.repository';
import { AccountClosedEvent } from '@shared/events';

@EventsHandler(AccountClosedEvent)
export class AccountCloseHandler implements IEventHandler<AccountClosedEvent> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async handle(event: AccountClosedEvent) {
    const account: Account = await this.repository.findOne({
      where: { id: event.id },
    });

    if (!account) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(account.id, { isActive: false });
  }
}
