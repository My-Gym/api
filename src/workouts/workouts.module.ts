import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Workout } from './workouts.model';
import { SetStrength } from '../sets/sets-strength.model';
import { SetCardio } from '../sets/sets-cardio.model';
import { Exercise } from '../exercises/exercises.model';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    SequelizeModule.forFeature([
      Workout,
      User,
      SetStrength,
      SetCardio,
      Exercise,
    ]),
  ],
})
export class WorkoutsModule {}
