import { BadRequestException, Injectable, InternalServerErrorException, UseInterceptors } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository, MemberRepositoryImpl } from "./member.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "./entities/member.entity";
import { raw } from 'express';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: MemberRepository,
    private memRe: MemberRepository
  ) {
  }

  async saveQueryRunner(createMemberDto: CreateMemberDto) {
    let member = this.memberRepository.create(createMemberDto);
    let member2 = this.memberRepository.create(createMemberDto);
    let member3 = this.memberRepository.create(createMemberDto);


    const queryRunner = this.memberRepository.queryRunner;
    await queryRunner?.connect();
    await queryRunner?.startTransaction();
    try {
      // await queryRunner?.manager.save(member);
      // await queryRunner?.manager.save(member2);
      // await queryRunner?.manager.save(member3);
      await this.memberRepository.save(member);
      await this.memberRepository.save(member2);
      await this.memberRepository.save(member3);
      await queryRunner?.commitTransaction();
    } catch (e) {
      await queryRunner?.rollbackTransaction();
    } finally {
      await queryRunner?.release();
    }
  }

  async create(createMemberDto: CreateMemberDto) {
    let member = this.memberRepository.create(createMemberDto);
    let member2 = this.memberRepository.create(createMemberDto);
    let member3 = this.memberRepository.create(createMemberDto);

    await this.memberRepository.manager.transaction(async (manager) => {
      await manager.save(member);
      await manager.save(member2);
      await manager.save(member3);
      // throw new InternalServerErrorException();
    })

    console.log('save');
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
