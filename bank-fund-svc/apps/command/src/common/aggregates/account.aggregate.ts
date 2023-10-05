import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

import {
  WithdrawFundsCommand,
  DepositFundsCommand,
  TransferFundsCommand,
  ReceiveFundsCommand,
} from '@shared/commands';
import {
  FundsWithdrawnEvent,
  FundsDepositedEvent,
  FundsTransferredEvent,
} from '@shared/events';
import { FundsReceivedEvent } from '@shared/events/funds-received.event';

export class AccountAggregate extends ExtendedAggregateRoot {
  private balance: number;

  constructor() {
    super();

    this.balance = 0;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }

  public depositFunds(command: DepositFundsCommand): void {
    const event: FundsDepositedEvent = new FundsDepositedEvent(command);

    this.apply(event);
  }

  public onFundsDepositedEvent(event: FundsDepositedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }

  public withdrawFunds(command: WithdrawFundsCommand): void {
    const event: FundsWithdrawnEvent = new FundsWithdrawnEvent(command);

    this.apply(event);
  }

  public onFundsWithdrawnEvent(event: FundsWithdrawnEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }

  public transferFunds(command: TransferFundsCommand) {
    const event: FundsTransferredEvent = new FundsTransferredEvent(command);

    this.apply(event);
  }

  public onFundsTransferredEvent(event: FundsTransferredEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }

  public receiveFunds(command: ReceiveFundsCommand): void {
    const event: FundsReceivedEvent = new FundsReceivedEvent(command);

    this.apply(event);
  }

  public onFundsReceivedEvent(event: FundsReceivedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }
}
