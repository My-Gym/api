import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { User } from '../users/users.model';
import { UsersRoles } from '../users/users-roles.model';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, UsersService],
  imports: [SequelizeModule.forFeature([Role, User, UsersRoles])],
  exports: [RolesService],
})
export class RolesModule {}
