import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [CatsModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
