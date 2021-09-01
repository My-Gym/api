import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UsersRoles } from '../users/users-roles.model';
import { User } from '../users/users.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UsersRoles) private userRolesRepository: typeof UsersRoles,
  ) {}

  createRole(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }

  getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }

  async getUserRolesByCode(code: string) {
    const user = await this.userRepository.findOne({ where: { code } });

    const userRoles = await this.userRolesRepository.findAll({
      where: { userId: user.id },
    });

    return this.roleRepository.findAll({
      where: { id: userRoles.map((elem) => elem.roleId) },
    });
  }
}
