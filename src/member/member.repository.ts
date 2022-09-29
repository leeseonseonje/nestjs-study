import { Member } from "./entities/member.entity";
import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberRepository extends Repository<Member> {

  async test(name: string) {
    console.log(name);
    let count = this.createQueryBuilder().select().from(Member, 'member').getCount();
    console.log(count)
  }
}