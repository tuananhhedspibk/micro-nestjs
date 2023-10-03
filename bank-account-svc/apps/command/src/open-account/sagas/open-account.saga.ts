import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  BankFundsCommandServiceClient,
  DepositFundsRequest,
  DepositFundsResponse,
} from '@command/common/proto/bank-funds-command.pb';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, delay, firstValueFrom, map } from 'rxjs';
import { AccountOpenedEvent } from '@shared/events';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@command/common/proto/bank-funds-query.pb';

@Injectable()
export class OpenAccountSaga implements OnModuleInit {
  @Inject(BANK_FUNDS_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private bankFundsCommandSerivce: BankFundsCommandServiceClient;

  public onModuleInit() {
    this.bankFundsCommandSerivce =
      this.client.getService<BankFundsCommandServiceClient>(
        BANK_FUNDS_COMMAND_SERVICE_NAME,
      );
  }

  @Saga()
  private onEvent(
    events$: Observable<AccountOpenedEvent>,
  ): Observable<ICommand> {
    const apply = map((event: AccountOpenedEvent) => {
      this.onAccountOpenedEvent(event);
      return null;
    });

    return <Observable<ICommand>>(
      events$.pipe(ofType(AccountOpenedEvent), delay(1000), apply)
    );
  }

  private async onAccountOpenedEvent(event: AccountOpenedEvent): Promise<void> {
    const req: DepositFundsRequest = {
      id: event.id,
      amount: event.openingBalance,
    };
    const res: DepositFundsResponse = await firstValueFrom(
      this.bankFundsCommandSerivce.depositFunds(req),
    );

    console.log({ req, res });
  }
}
