import { BadRequestException, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from "./member.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "./entities/member.entity";

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: MemberRepository,
  ) {
  }

  async create(createMemberDto: CreateMemberDto) {

    let member = this.memberRepository.create(createMemberDto);
    await this.memberRepository.save(member);
  }

  findAll() {
    return this.memberRepository.find();
  }

  async findById(id: number) {
    let findMember = await this.memberRepository.findOneBy({ id });
    console.log(findMember);
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {

  }

  remove(id: number) {
    this.memberRepository.delete(id);
  }
}
