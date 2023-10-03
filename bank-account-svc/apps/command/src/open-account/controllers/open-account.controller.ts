import {
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
  OpenAccountResponse,
} from '@command/common/proto/bank-account-command.pb';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { OpenAccountDto } from './open-account.dto';
import { OpenAccountCommand } from '@shared/commands';

@Controller()
export class OpenAccountController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_ACCOUNT_COMMAND_SERVICE_NAME, 'OpenAccount')
  private async openAccount(
    @Body() payload: OpenAccountDto,
  ): Promise<OpenAccountResponse> {
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, data: command.getId(), error: null };
  }
}
