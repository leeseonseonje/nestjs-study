import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';
import { Custom } from '../decorator/decorater.custom';
import { CustomIntPipe } from '../pipes/parse-int-pipe';
import { CustomExceptionFilter } from '../exception-filter/custom.exception.filter';
import { CustomException } from '../exception-filter/excepiton/custom.exception';
import { CustomGuard } from '../guard/custom.guard';
import { CustomInterceptor } from '../interceptor/custom.interceptor';

@Controller('member')
// @UseFilters(CustomExceptionFilter)
// @UseGuards(CustomGuard)
@UseInterceptors(CustomInterceptor)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/pipe/:id')
  pipeTest(@Param('id') id: string) {
    console.log(`id: ${id}`);
    return id;
  }

  @Get('/decorator')
  decoratorTest(@Custom('name', CustomIntPipe) req: Request) {
    console.log(req);
  }

  @Post()
  create(@Body(ValidationPipe) createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    console.log('findAll Controller');
    return this.memberService.findAll();
  }

  @Get('/throw/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    throw new CustomException('custom');
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string) {
    return this.memberService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
