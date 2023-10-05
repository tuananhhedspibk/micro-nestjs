import { AccountAggregate } from '@command/common/aggregates/account.aggregate';
import { BankAccountQueryServiceClient } from '@command/common/proto/bank-account-query.pb';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ReceiveFundsCommand } from '@shared/commands';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

@CommandHandler(ReceiveFundsCommand)
export class ReceiveFundsHandler
  implements ICommandHandler<ReceiveFundsCommand>
{
  private accountQSvc: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: ReceiveFundsCommand): Promise<any> {
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(
      AccountAggregate,
      command.id,
    );

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.receiveFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
