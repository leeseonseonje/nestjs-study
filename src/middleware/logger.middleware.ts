import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: any, res: any, next: (error?: any) => void): any {
    console.log(`request: ${req}`);
    console.log(`response: ${res}`);
    console.log(`next: ${next}`);
    next();
  }

}