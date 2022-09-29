import { Member } from "./entities/member.entity";
import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberRepository extends Repository<Member> {
  test(name: string): void {
    console.log(name)
  }
}

export interface MemberRepositoryCustom {

  test(name: string): void;
}

@Injectable()
export class MemberRepositoryImpl implements MemberRepositoryCustom {
  test(name: string): void {
    console.log(name)
  }
}