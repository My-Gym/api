import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Workout } from './workouts.model';
import { Exercise } from '../exercises/exercises.model';
import { WorkoutSet } from './workout-sets.model';
import { UsersService } from '../users/users.service';
import { UsersRoles } from '../users/users-roles.model';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';

@Module({
  providers: [WorkoutsService, UsersService, RolesService],
  controllers: [WorkoutsController],
  imports: [
    SequelizeModule.forFeature([
      Workout,
      User,
      Role,
      Exercise,
      WorkoutSet,
      UsersRoles,
    ]),
  ],
})
export class WorkoutsModule {}
