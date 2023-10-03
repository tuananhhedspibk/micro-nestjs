import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { configure, util } from 'protobufjs';
import Long from 'long';
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

export const BANK_ACCOUNT_COMMAND_PACKAGE_NAME = 'bank_account_command';

export interface BankAccountCommandServiceClient {
  openAccount(request: OpenAccountRequest): Observable<OpenAccountResponse>;
  closeAccount(request: CloseAccountRequest): Observable<CloseAccountResponse>;
}

export interface BankAccountCommandServiceController {
  openAccount(
    request: OpenAccountRequest,
  ):
    | Promise<OpenAccountResponse>
    | Observable<OpenAccountResponse>
    | OpenAccountResponse;

  closeAccount(
    request: CloseAccountRequest,
  ):
    | Promise<CloseAccountResponse>
    | Observable<CloseAccountResponse>
    | CloseAccountResponse;
}

export function BankAccountCommandServiceControllerMethods() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    const grpcMethods: string[] = ['openAccount', 'closeAccount'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('BankAccountCommandService', method)(
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
      GrpcStreamMethod('BankAccountCommandService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const BANK_ACCOUNT_COMMAND_SERVICE_NAME = 'BankAccountCommandService';

if (util.Long !== Long) {
  util.Long = Long;
  configure();
}
