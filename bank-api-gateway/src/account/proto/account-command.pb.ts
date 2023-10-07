import { Observable } from 'rxjs';

export const protobufPackage = 'bank_account_command';

export interface OpenAccountRequest {
  holder: string;
  type: string;
  email: string;
  openingBalance: number;
}

export interface OpenAccountResponse {
  status: number;
  error: string[];
  data: string;
}

export interface CloseAccountRequest {
  id: string;
}

export interface CloseAccountResponse {
  status: number;
  error: string[];
}

export interface BankAccountCommandServiceClient {
  openAccount(request: OpenAccountRequest): Observable<OpenAccountResponse>;
  closeAccount(request: CloseAccountRequest): Observable<CloseAccountResponse>;
}

export const BANK_ACCOUNT_COMMAND_PACKAGE_NAME = 'bank_account_command';
export const BANK_ACCOUNT_COMMAND_SERVICE_NAME = 'BankAccountCommandService';
