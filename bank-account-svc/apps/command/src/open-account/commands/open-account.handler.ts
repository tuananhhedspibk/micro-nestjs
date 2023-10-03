import { AccountAggregate } from '@command/common/aggregates/account.aggregate';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from '@shared/commands';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: OpenAccountCommand): Promise<void> {
    const aggregate: AccountAggregate = new AccountAggregate();

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.openAccount(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
