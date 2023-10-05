import { WithdrawFundsCommand } from '@shared/commands';
import { BaseEvent } from 'nestjs-event-sourcing';

export class FundsWithdrawnEvent extends BaseEvent {
  public amount: number;

  constructor(command?: WithdrawFundsCommand) {
    super();

    if (!command) return;

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
