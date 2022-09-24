import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { BadGatewayException, BadRequestException } from "@nestjs/common";
import { request } from 'http';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it ('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it ('findOne', () => {
    expect(controller.findOne('23')).toEqual(23);
  });

  it('parseIntError', () => {
    console.log(controller.findOne('23'));
    console.log(controller.findOne('error'));
  });
});
