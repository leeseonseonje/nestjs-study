import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { BadGatewayException, BadRequestException } from "@nestjs/common";

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
    expect(controller.findOne("23")).toEqual(23);
  });

  it("findOneParseIntError", async () => {
    // await expect(controller.findOne("error")).rejects.toThrowError(new BadRequestException());
    // controller.findOne("error");
    // throw new BadRequestException();
  });
});
