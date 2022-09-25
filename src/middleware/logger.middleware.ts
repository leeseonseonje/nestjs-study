import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: any, res: any, next: (error?: any) => void): any {
    console.log('loggerMiddleware');
    next();
  }
}

@Injectable()
export class LogMiddleware implements NestMiddleware {

  use(req: any, res: any, next: (error?: any) => void): any {
    console.log('logMiddleware');
    next();
  }
}