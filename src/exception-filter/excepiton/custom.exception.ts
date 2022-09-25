import { HttpException } from '@nestjs/common';

export class CustomException extends Error {

  constructor(message: string) {
    super(message);
  }
}