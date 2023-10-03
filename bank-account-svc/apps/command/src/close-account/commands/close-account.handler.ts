import { Inject } from '@nestjs/common';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { AccountAggregate } from '@command/common/aggregates/account.aggregate';
import { CloseAccountCommand } from '@shared/commands';

export class CloseAccountHandler
  implements ICommandHandler<CloseAccountCommand>
{
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: CloseAccountCommand): Promise<void> {
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(
      AccountAggregate,
      command.id,
    );

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.closeAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
