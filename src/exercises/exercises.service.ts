import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExGroupsService } from '../ex-groups/ex-groups.service';
import { Exercise } from './exercises.model';
import { UsersService } from '../users/users.service';
import { CommonExceptions } from '../exceptions/common.exceptions';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise) private exerciseRepository: typeof Exercise,
    private exGroupService: ExGroupsService,
    private userService: UsersService,
  ) {}

  async create(dto: CreateExerciseDto): Promise<Exercise> {
    const user = await this.userService.getByCode(dto.userCode);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const group = await this.exGroupService.getByValue(dto.group);
    if (!group) {
      throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.exerciseRepository.create({
        ...dto,
        exGroupId: group.id,
        authorId: user.id,
      });
    } catch (e) {
      throw new CommonExceptions(e);
    }
  }
}
