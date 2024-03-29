import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Exercise } from './exercises.model';
import { ExGroup } from '../ex-groups/ex-groups.model';
import { ExGroupsService } from '../ex-groups/ex-groups.service';
import { UsersService } from '../users/users.service';
import { Workout } from '../workouts/workouts.model';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { UsersRoles } from '../users/users-roles.model';
import { ExContent } from './ex-contents.model';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [ExercisesController],
  providers: [
    ExercisesService,
    ExGroupsService,
    UsersService,
    RolesService,
    FilesService,
  ],
  imports: [
    SequelizeModule.forFeature([
      Exercise,
      User,
      ExGroup,
      Workout,
      Role,
      UsersRoles,
      ExContent,
    ]),
  ],
})
export class ExercisesModule {}
