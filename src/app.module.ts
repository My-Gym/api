import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ExGroupsModule } from './ex-groups/ex-groups.module';
import { ExercisesModule } from './exercises/exercises.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { ExGroup } from './ex-groups/ex-groups.model';
import { Exercise } from './exercises/exercises.model';
import { UsersRoles } from './users/users-roles.model';
import { RolesGuard } from './roles/roles.guard';
import { PlatformGuard } from './guards/platform.guard';
import { SecurityGuard } from './guards/security.guard';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsModule } from './sets/sets.module';
import { SetStrength } from './sets/sets-strength.model';
import { SetCardio } from './sets/sets-cardio.model';
import { Workout } from "./workouts/workouts.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UsersRoles,
        Exercise,
        ExGroup,
        Workout,
        SetStrength,
        SetCardio,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    ExercisesModule,
    ExGroupsModule,
    WorkoutsModule,
    SetsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PlatformGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SecurityGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
