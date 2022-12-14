import { IsInt, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
