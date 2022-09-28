import { DynamicModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MemberModule } from './member/member.module';
import { LoggerMiddleware, LogMiddleware } from './middleware/logger.middleware';
import { MemberController } from './member/member.controller';
import { DataSource } from 'typeorm';
import { dbConfig } from "./db.connect/db.config";
import { TypeOrmExModule } from "./decorator/typeorm-ex.decorator";
import { MemberRepository } from "./member/member.repository";


@Module({
  imports: [CatsModule, MemberModule, dbConfig, TypeOrmExModule.forCustomRepository([MemberRepository])],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, LogMiddleware)
      .forRoutes(MemberController);
  }


}
