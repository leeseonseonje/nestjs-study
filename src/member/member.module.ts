import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { Member } from './entities/member.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository, MemberRepositoryImpl } from './member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
