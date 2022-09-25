import { Module } from '@nestjs/common';
import { CatsService, TransientService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
  providers: [CatsService, TransientService]
})
export class CatsModule {}
