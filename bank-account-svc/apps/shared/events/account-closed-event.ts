import { BaseEvent } from 'nestjs-event-sourcing';
import { CloseAccountCommand } from '@shared/commands';

export class AccountClosedEvent extends BaseEvent {
  constructor(command?: CloseAccountCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
  }
}
