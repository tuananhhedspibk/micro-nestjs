import { HttpException, HttpStatus } from '@nestjs/common';
import { OpenAccountCommand, CloseAccountCommand } from '@shared/commands';
import { AccountClosedEvent, AccountOpenedEvent } from '@shared/events';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export class AccountAggregate extends ExtendedAggregateRoot {
  private active: boolean;
  private balance: number;

  public getActive(): boolean {
    return this.active;
  }

  public setActive(value: boolean) {
    this.active = value;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }

  public openAccount(command: OpenAccountCommand): void {
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);

    this.apply(event);
  }

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }

  public closeAccount(command: CloseAccountCommand) {
    if (!this.active) {
      throw new HttpException(
        'This account is already closed!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const event: AccountClosedEvent = new AccountClosedEvent(command);
    this.apply(event);
  }

  public onAccountClosedEvent(event: AccountClosedEvent): void {
    this.id = event.id;
    this.setActive(false);
  }
}
