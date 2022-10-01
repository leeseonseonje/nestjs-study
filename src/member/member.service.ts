import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { DataSource } from 'typeorm';
import { MemberRepository } from './member.repository';
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: MemberRepository,

    private memRe: MemberRepository,

    private dataSource: DataSource,
  ) {}

  async saveQueryRunner(createMemberDto: CreateMemberDto) {
    const qr = this.dataSource.createQueryRunner();
    const member = qr.manager.create(Member, createMemberDto);
    const member2 = qr.manager.create(Member, createMemberDto);
    const member3 = qr.manager.create(Member, createMemberDto);

    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.save(member);
      await qr.manager.save(member2);
      await qr.manager.save(member3);
      // throw new InternalServerErrorException();
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
      return member;
    }
  }

  async create(createMemberDto: CreateMemberDto) {
    const member = this.memberRepository.create(createMemberDto);
    const member2 = this.memberRepository.create(createMemberDto);
    const member3 = this.memberRepository.create(createMemberDto);

    await this.memberRepository.manager.transaction(async (manager) => {
      await manager.save(member);
      await manager.save(member2);
      await manager.save(member3);
      // throw new InternalServerErrorException();
    });

    console.log('save');
  }

  findAll() {
    return this.memberRepository.find();
  }

  async findById(id: number) {
    const findMember = await this.memberRepository.findOneBy({ id });
    console.log(findMember);
    return id;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = this.memberRepository.create(updateMemberDto);
  }

  remove(id: number) {
    this.memberRepository.delete(id);
  }
}
