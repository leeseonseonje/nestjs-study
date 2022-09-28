import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { AppModule } from "../app.module";
import { CatsModule } from "../cats/cats.module";
import { MemberModule } from "./member.module";
import { TypeOrmModule } from "@nestjs/typeorm";

const request = require('supertest');

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule, MemberModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nestjs',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne', () => {
    expect(controller.findById('23')).toBe(23);
  });

  it('parseIntError', async () => {
    await request('http://localhost:3000')
      .get('/member/error')
      .send()
      .expect(400);
  });
});
