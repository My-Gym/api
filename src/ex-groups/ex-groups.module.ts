import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Exercise } from '../exercises/exercises.model';
import { ExGroup } from './ex-groups.model';
import { ExGroupsController } from './ex-groups.controller';
import { ExGroupsService } from './ex-groups.service';

@Module({
  imports: [SequelizeModule.forFeature([Exercise, ExGroup])],
  controllers: [ExGroupsController],
  providers: [ExGroupsService],
  exports: [ExGroupsService],
})
export class ExGroupsModule {}
