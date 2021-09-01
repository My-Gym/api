import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UsersRoles } from './users-roles.model';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { Exercise } from '../exercises/exercises.model';
import { Workout } from '../workouts/workouts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [
    SequelizeModule.forFeature([User, Role, UsersRoles, Exercise, Workout]),
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
