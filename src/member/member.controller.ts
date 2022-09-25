import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req, UseFilters, ValidationPipe
} from "@nestjs/common";
import { MemberService } from "./member.service";
import { CreateMemberDto } from "./dto/create-member.dto";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { Request } from "express";
import { Custom } from "../decorator/decorater.custom";
import { CustomIntPipe } from '../pipes/parse-int-pipe';
import { CustomExceptionFilter } from '../exception-filter/custom.exception.filter';
import { CustomException } from '../exception-filter/excepiton/custom.exception';

@Controller('member')
@UseFilters(CustomExceptionFilter)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get("/pipe/:id")
  pipeTest(@Param('id') id: string) {
    console.log(`id: ${id}`)
  }

  @Get("/decorator")
  decoratorTest(@Custom('name', CustomIntPipe) req: Request) {
    console.log(req);
  }

  @Post()
  create(@Body(ValidationPipe) createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get("/throw/:id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    throw new CustomException('custom');
    // return this.memberService.findOne(+id);
  }

  @Get(":id")
  returnId(@Param("id") id: string) {
    return this.memberService.findOne(+id);
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
