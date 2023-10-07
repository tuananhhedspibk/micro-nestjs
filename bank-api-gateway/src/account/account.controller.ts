import {
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
  BankAccountCommandServiceClient,
  CloseAccountRequest,
  CloseAccountResponse,
  OpenAccountRequest,
  OpenAccountResponse,
} from './proto/account-command.pb';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  BankAccountQueryServiceClient,
  FindAccountResponse,
  FindAllAccountsResponse,
} from './proto/account-query.pb';

@Controller('account')
export class BankAccountController implements OnModuleInit {
  private commandSvc: BankAccountCommandServiceClient;
  private querySvc: BankAccountQueryServiceClient;

  @Inject(BANK_ACCOUNT_COMMAND_SERVICE_NAME)
  private readonly commandClient: ClientGrpc;

  @Inject(BANK_ACCOUNT_QUERY_SERVICE_NAME)
  private readonly queryClient: ClientGrpc;

  public onModuleInit(): void {
    this.commandSvc =
      this.commandClient.getService<BankAccountCommandServiceClient>(
        BANK_ACCOUNT_COMMAND_SERVICE_NAME,
      );
    this.querySvc = this.queryClient.getService<BankAccountQueryServiceClient>(
      BANK_ACCOUNT_QUERY_SERVICE_NAME,
    );
  }

  @Post('/open')
  private async openAccount(
    @Req() req: Request,
  ): Promise<Observable<OpenAccountResponse>> {
    const body: OpenAccountRequest = req.body;

    return this.commandSvc.openAccount(body);
  }

  @Delete('/close')
  private async closeAccount(
    @Req() req: Request,
  ): Promise<Observable<CloseAccountResponse>> {
    const body: CloseAccountRequest = req.body;

    return this.commandSvc.closeAccount(body);
  }

  @Get('/find/:id')
  private async findAccount(
    @Param('id') id: string,
  ): Promise<Observable<FindAccountResponse>> {
    return this.querySvc.findAccount({ id });
  }

  @Get('/find-all')
  private async findAllAccounts(
    @Query() query: { page: number },
  ): Promise<Observable<FindAllAccountsResponse>> {
    const { page } = query;

    return this.querySvc.findAllAccounts({ page });
  }
}
