import { Module } from '@nestjs/common';
import { ExContentsController } from './ex-contents.controller';
import { ExContentsService } from './ex-contents.service';

@Module({
  controllers: [ExContentsController],
  providers: [ExContentsService],
})
export class ExContentsModule {}
