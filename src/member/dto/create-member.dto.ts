import { IsString, IsInt } from 'class-validator';

export class CreateMemberDto {

  @IsString()
  name: string;

  @IsInt()
  age: number;
}