import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { LoggingInterceptor } from '../interceptor/custom.interceptor';

@Injectable()
export class MemberService {

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  findAll() {
    console.log('findAll Service');
    return `This action returns all member`;
  }

  findOne(id: number) {
    return id
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
