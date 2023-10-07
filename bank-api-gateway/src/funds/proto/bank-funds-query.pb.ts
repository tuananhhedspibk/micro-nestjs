import { Observable } from 'rxjs';

export const protobufPackage = 'bank_funds_query';

export interface GetBalanceRequest {
  id: string;
}

export interface GetBalanceResponse {
  status: number;
  error: string[];
  data: number;
}

export const BANK_FUNDS_QUERY_PACKAGE_NAME = 'bank_funds_query';

export interface BankFundsQueryServiceClient {
  getBalance(request: GetBalanceRequest): Observable<GetBalanceResponse>;
}

export const BANK_FUNDS_QUERY_SERVICE_NAME = 'BankFundsQueryService';
