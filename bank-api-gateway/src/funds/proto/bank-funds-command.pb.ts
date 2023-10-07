import { Observable } from 'rxjs';

export const protobufPackage = 'bank_funds_command';

export interface DepositFundsRequest {
  id: string;
  amount: number;
}

export interface DepositFundsResponse {
  status: number;
  error: string[];
}

export interface WithdrawFundsRequest {
  id: string;
  amount: number;
}

export interface WithdrawFundsResponse {
  status: number;
  error: string[];
}

export interface TransferFundsRequest {
  fromId: string;
  toId: string;
  amount: number;
}

export interface TransferFundsResponse {
  status: number;
  error: string[];
}

export const BANK_FUNDS_COMMAND_PACKAGE_NAME = 'bank_funds_command';

export interface BankFundsCommandServiceClient {
  depositFunds(request: DepositFundsRequest): Observable<DepositFundsResponse>;
  withdrawFunds(
    request: WithdrawFundsRequest,
  ): Observable<WithdrawFundsResponse>;
  transferFunds(
    request: TransferFundsRequest,
  ): Observable<TransferFundsResponse>;
}

export const BANK_FUNDS_COMMAND_SERVICE_NAME = 'BankFundsCommandService';
