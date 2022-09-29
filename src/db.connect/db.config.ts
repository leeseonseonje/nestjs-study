import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dbConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs',
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});