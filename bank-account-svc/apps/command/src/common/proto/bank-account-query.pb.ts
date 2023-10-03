import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { configure, util } from 'protobufjs';
import Long from 'long';
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

export interface BankAccountQueryServiceController {
  findAccount(
    request: FindAccountRequest,
  ):
    | Promise<FindAccountResponse>
    | Observable<FindAccountResponse>
    | FindAccountResponse;
  findAllAccounts(
    request: FindAllAccountsRequest,
  ):
    | Promise<FindAllAccountsResponse>
    | Observable<FindAllAccountsResponse>
    | FindAllAccountsResponse;
}

export function BankAccountQueryServiceControllerMethods() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAccount', 'findAllAccounts'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('BankAccountQueryService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }

    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('BankAccountQueryService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const BANK_ACCOUNT_QUERY_SERVICE_NAME = 'BankAccountQueryService';

if (util.Long !== Long) {
  util.Long = Long;
  configure();
}
