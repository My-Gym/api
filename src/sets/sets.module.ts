import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { SetStrength } from './sets-strength.model';
import { SetCardio } from './sets-cardio.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [SequelizeModule.forFeature([SetStrength, SetCardio])],
})
export class SetsModule {}
