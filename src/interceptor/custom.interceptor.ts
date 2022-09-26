import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { catchError, map, Observable, of, pipe, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { log } from 'util';
import e from 'express';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(async () => console.log(`After... ${Date.now() - now}ms`)),
      )
      .pipe(tap(async () => console.log('End')))
      .pipe(tap(s => console.log(s)))
      .pipe(map(v => 'map'));
  }
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}