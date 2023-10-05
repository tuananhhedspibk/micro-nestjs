import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  WithdrawFundsResponse,
} from '@command/common/proto/bank-funds-command.pb';

import { WithdrawFundsDto } from './withdraw-funds.dto';

import { WithdrawFundsCommand } from '@shared/commands';

@Controller()
export class WithdrawFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_FUNDS_COMMAND_SERVICE_NAME, 'WithdrawFunds')
  public async withdrawFunds(
    @Body() payload: WithdrawFundsDto,
  ): Promise<WithdrawFundsResponse> {
    const command: WithdrawFundsCommand = new WithdrawFundsCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
