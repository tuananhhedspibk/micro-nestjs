import { Observable } from 'rxjs';

export const protobufPackage = 'bank_account_query';

export interface Account {
  id: string;
  holder: string;
  isActive: boolean;
}

export interface FindAllAccountsResponseData {
  accounts: Account[];
  total: number;
  count: number;
  page: number;
}

export interface FindAllAccountsRequest {
  page: number;
}

export interface FindAllAccountsResponse {
  status: number;
  error: string[];
  data: FindAllAccountsResponseData | undefined;
}

export interface FindAccountRequest {
  id: string;
}

export interface FindAccountResponse {
  status: number;
  error: string[];
  data: Account | undefined;
}

export const BANK_ACCOUNT_QUERY_PACKAGE_NAME = 'bank_account_query';

export interface BankAccountQueryServiceClient {
  findAccount(request: FindAccountRequest): Observable<FindAccountResponse>;
  findAllAccounts(
    request: FindAllAccountsRequest,
  ): Observable<FindAllAccountsResponse>;
}

export const BANK_ACCOUNT_QUERY_SERVICE_NAME = 'BankAccountQueryService';
