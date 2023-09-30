import { OpenAccountCommand } from '@shared/commands/open-account.command';
import { AccountType } from '@shared/enums/account-type.enum';
import { BaseEvent } from 'nestjs-event-sourcing';

export class AccountOpenedEvent extends BaseEvent {
  public holder: string;
  public email: string;
  public type: AccountType;
  public openingBalance: number;
  public createdDate: Date;

  constructor(command?: OpenAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.getId();
    this.holder = command.getHolder();
    this.email = command.getEmail();
    this.type = command.getType();
    this.openingBalance = command.getOpeningBalance();
    this.createdDate = new Date();
  }
}
