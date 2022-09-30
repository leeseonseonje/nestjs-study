import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberModule } from "./member.module";
import { CatsModule } from "../cats/cats.module";
import { dbConfig } from "../db.connect/db.config";
import { AppModule } from "../app.module";

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule, MemberModule, AppModule, dbConfig,]
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', () => {
    expect(service.findAll()).toBe(`This action returns all member`);
  });

  it("save", async () => {
    await service.create({ name: 'name', age: 25, signCount: 1 });
  });

  it('queryRunner', async () => {
    await service.saveQueryRunner({ name: 'name', age: 25, signCount: 1 });
  });
});
