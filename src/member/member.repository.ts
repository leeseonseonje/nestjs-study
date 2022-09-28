import { Injectable } from "@nestjs/common";
import { Member } from "./entities/member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomRepository } from "../decorator/typeorm-ex.decorator";

export class MemberRepository extends Repository<Member> {

  findByName(name: string) {
    return this.find();
  }
}