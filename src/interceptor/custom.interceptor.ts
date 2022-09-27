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
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../member/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>
  ) {
  }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle();
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