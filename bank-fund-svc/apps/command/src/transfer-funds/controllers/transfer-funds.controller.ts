import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  TransferFundsResponse,
} from '@command/common/proto/bank-funds-command.pb';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { TransferFundsDto } from './transfer-funds.dto';
import { TransferFundsCommand } from '@shared/commands';

@Controller()
export class TransferFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_FUNDS_COMMAND_SERVICE_NAME, 'TransferFunds')
  public async transferFunds(
    @Body() payload: TransferFundsDto,
  ): Promise<TransferFundsResponse> {
    if (payload.fromId === payload.toId) {
      throw new HttpException(
        'Can not transfer money to the same account',
        HttpStatus.CONFLICT,
      );
    }

    const command: TransferFundsCommand = new TransferFundsCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
