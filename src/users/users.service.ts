import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Sequelize } from 'sequelize';
import { Role } from '../roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { UsersRoles } from './users-roles.model';
import { CommonExceptions } from '../exceptions/common.exceptions';
import { decodeUserCode } from '../utils';
// import { AddExerciseDto } from './dto/add-exercise.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UsersRoles) private usersRolesRepository: typeof UsersRoles,
    private roleService: RolesService,
    @InjectConnection() private connect: Sequelize,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const transaction = await this.connect.transaction();
    const [externalId, source] = decodeUserCode(dto.code);
    try {
      const roleUser = await this.roleService.getRoleByValue('USER');
      const roles = [roleUser.id];

      if (dto.code === `101271861_${source}`) {
        const roleAdmin = await this.roleService.getRoleByValue('ADMIN');
        roles.push(roleAdmin.id);
      }

      const user = await this.userRepository.create(
        { ...dto, externalId: Number(externalId), source },
        { transaction },
      );
      await user.$set('roles', roles, { transaction });
      await transaction.commit();
      return user;
    } catch (e) {
      await transaction.rollback();
      throw new CommonExceptions(e);
    }
  }

  async addRole(dto: AddRoleDto): Promise<any> {
    const { role, code } = dto;

    const roleObj: Role = await this.roleService.getRoleByValue(role);
    if (!roleObj) {
      throw new HttpException(
        `Роль - ${role} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }

    const userObj: User = await this.userRepository.findOne({
      where: { code: code },
    });
    if (!userObj) {
      throw new HttpException(
        `Пользователь - ${code} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }

    const userRole = await this.usersRolesRepository.findOne({
      where: { roleId: roleObj.id, userId: userObj.id },
    });
    if (userRole) {
      throw new HttpException(
        `Данная роль - ${role} уже добавлена`,
        HttpStatus.CONFLICT,
      );
    }

    await userObj.$add('role', roleObj.id);
  }

  getAll() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getByCode(code: string) {
    const user = await this.userRepository.findOne({ where: { code } });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
