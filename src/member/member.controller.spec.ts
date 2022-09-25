import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { BadGatewayException, BadRequestException, NotFoundException } from "@nestjs/common";

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne', () => {
    expect(controller.returnId('23')).toBe(23);
  });

  it('parseIntError', async () => {
    await expect( async () => {
      await controller.findOne('error');
    }).rejects.toThrowError(BadRequestException);
  });
});
