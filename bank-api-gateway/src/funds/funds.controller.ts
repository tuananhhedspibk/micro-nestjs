import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  BankFundsCommandServiceClient,
  DepositFundsRequest,
  DepositFundsResponse,
  TransferFundsRequest,
  TransferFundsResponse,
  WithdrawFundsRequest,
  WithdrawFundsResponse,
} from './proto/bank-funds-command.pb';
import {
  BANK_FUNDS_QUERY_SERVICE_NAME,
  BankFundsQueryServiceClient,
  GetBalanceResponse,
} from './proto/bank-funds-query.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('funds')
export class BankFundsController implements OnModuleInit {
  private commandSvc: BankFundsCommandServiceClient;
  private querySvc: BankFundsQueryServiceClient;

  @Inject(BANK_FUNDS_COMMAND_SERVICE_NAME)
  private readonly commandClient: ClientGrpc;

  @Inject(BANK_FUNDS_QUERY_SERVICE_NAME)
  private readonly queryClient: ClientGrpc;

  public onModuleInit(): void {
    this.commandSvc =
      this.commandClient.getService<BankFundsCommandServiceClient>(
        BANK_FUNDS_COMMAND_SERVICE_NAME,
      );

    this.querySvc = this.queryClient.getService<BankFundsQueryServiceClient>(
      BANK_FUNDS_QUERY_SERVICE_NAME,
    );
  }

  @Put('/deposit')
  private async depositFunds(
    @Req() req: Request,
  ): Promise<Observable<DepositFundsResponse>> {
    const body: DepositFundsRequest = req.body;

    return this.commandSvc.depositFunds(body);
  }

  @Put('/withdraw')
  private async withdrawFunds(
    @Req() req: Request,
  ): Promise<Observable<WithdrawFundsResponse>> {
    const body: WithdrawFundsRequest = req.body;

    return this.commandSvc.withdrawFunds(body);
  }

  @Put('/transfer')
  private async transferFunds(
    @Req() req: Request,
  ): Promise<Observable<TransferFundsResponse>> {
    const body: TransferFundsRequest = req.body;

    return this.commandSvc.transferFunds(body);
  }

  @Get('/balance/:id')
  private async getBalance(
    @Param() id: string,
  ): Promise<Observable<GetBalanceResponse>> {
    return this.querySvc.getBalance({ id });
  }
}
