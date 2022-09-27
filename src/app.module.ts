import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MemberModule } from './member/member.module';
import { LoggerMiddleware, LogMiddleware } from './middleware/logger.middleware';
import { MemberController } from './member/member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Member } from './member/entities/member.entity';

@Module({
  imports: [CatsModule, MemberModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    entities: [Member],
    synchronize: true,
  }),],
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
