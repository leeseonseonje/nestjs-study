import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MemberModule } from './member/member.module';
import { LoggerMiddleware, LogMiddleware } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { MemberController } from './member/member.controller';

@Module({
  imports: [CatsModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, LogMiddleware)
      .forRoutes(MemberController);
  }


}
