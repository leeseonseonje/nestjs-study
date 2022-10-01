import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberModule } from './member.module';
import { CatsModule } from '../cats/cats.module';
import { AppModule } from '../app.module';
import { dbConfig } from '../db.connect/db.config';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule, MemberModule, AppModule, dbConfig],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('save', async () => {
    await service.create({ name: 'name', age: 25 });
    jest.setTimeout(3000);
  });

  it('queryRunner', async () => {
    const member = await service.saveQueryRunner({ name: 'name', age: 25 });
    expect(member).toEqual(member);
  });

  it('runTest', () => {
    console.log('test');
  });
});

