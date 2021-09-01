import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonExceptions extends HttpException {
  constructor(e: Error) {
    super(`${e.name}: ${e.message}`, HttpStatus.BAD_REQUEST);
  }
}
