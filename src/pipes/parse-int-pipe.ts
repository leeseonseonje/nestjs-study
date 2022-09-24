import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  ParseIntPipeOptions,
  PipeTransform
} from '@nestjs/common';

@Injectable()
export class CustomIntPipe implements PipeTransform<string> {

  constructor(@Optional() options?: ParseIntPipeOptions) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    if (!this.isNumeric(value)) {
      console.log('!!!');
      throw new BadRequestException('badRequest');
    }
    return parseInt(value, 10);
  }

  protected isNumeric(value: string): boolean {
    return (
      ['string', 'number'].includes(typeof value) &&
      /^-?\d+$/.test(value) &&
      isFinite(value as any)
    );
  }
}