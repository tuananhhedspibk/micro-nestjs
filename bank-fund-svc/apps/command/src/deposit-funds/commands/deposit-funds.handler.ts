import { AccountAggregate } from '@command/common/aggregates/account.aggregate';
import {
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  BankAccountQueryServiceClient,
  FindAccountResponse,
} from '@command/common/proto/bank-account-query.pb';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { DepositFundsCommand } from '@shared/commands';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { firstValueFrom } from 'rxjs';

@CommandHandler(DepositFundsCommand)
export class DepositFundsHandler
  implements ICommandHandler<DepositFundsCommand>
{
  private accountQSvc: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  @Inject(BANK_ACCOUNT_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.accountQSvc = this.client.getService<BankAccountQueryServiceClient>(
      BANK_ACCOUNT_QUERY_SERVICE_NAME,
    );
  }

  public async execute(command: DepositFundsCommand): Promise<void> {
    const res: FindAccountResponse = await firstValueFrom(
      this.accountQSvc.findAccount({ id: command.id }),
    );

    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(
      AccountAggregate,
      command.id,
    );

    this.publisher.mergeObjectContext(aggregate as any);
    aggregate.depositFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
