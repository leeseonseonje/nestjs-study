import { Member } from "./entities/member.entity";
import { Repository } from "typeorm";

export class MemberRepository extends Repository<Member> {

  findByName(name: string) {
    return this.find();
  }
}