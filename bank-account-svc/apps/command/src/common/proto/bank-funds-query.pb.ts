import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { configure, util } from 'protobufjs';
import { Observable } from 'rxjs';

import Long from 'long';

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

export interface BankFundsQueryServiceController {
  getBalance(
    request: GetBalanceRequest,
  ):
    | Promise<GetBalanceResponse>
    | Observable<GetBalanceResponse>
    | GetBalanceResponse;
}

export function BankFundsQueryServiceControllerMethods() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getBalance'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('BankFundsQueryService', method)(
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
      GrpcStreamMethod('BankFundsQueryService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const BANK_FUNDS_QUERY_SERVICE_NAME = 'BankFundsQueryService';

if (util.Long !== Long) {
  util.Long = Long;
  configure();
}
