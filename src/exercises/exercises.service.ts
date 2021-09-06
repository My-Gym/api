import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExGroupsService } from '../ex-groups/ex-groups.service';
import { Exercise } from './exercises.model';
import { UsersService } from '../users/users.service';
import { CommonExceptions } from '../exceptions/common.exceptions';
import { Sequelize } from 'sequelize';
import { ExContent } from './ex-contents.model';
import { FilesService } from '../files/files.service';
import * as Bluebird from 'bluebird';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise) private exerciseRepository: typeof Exercise,
    @InjectModel(ExContent) private exContentRepository: typeof ExContent,
    private exGroupService: ExGroupsService,
    private userService: UsersService,
    private filesService: FilesService,
    @InjectConnection() private connect: Sequelize,
  ) {}

  async create(dto: CreateExerciseDto): Promise<Exercise> {
    console.log('dto.filesData', dto.filesData);
    const user = await this.userService.getByCode(dto.userCode);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const group = await this.exGroupService.getByValue(dto.group);
    if (!group) {
      throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND);
    }

    const transaction = await this.connect.transaction();
    console.log(dto.filesData);
    try {
      const exercise = await this.exerciseRepository.create(
        {
          ...dto,
          exGroupId: group.id,
          authorId: user.id,
        },
        { transaction },
      );

      const contentData = dto.filesData.map((file) => ({
        ...file,
        exerciseId: exercise.id,
      }));

      await this.exContentRepository.bulkCreate(contentData, { transaction });

      await transaction.commit();
      return exercise;
    } catch (e) {
      await transaction.rollback();

      await Bluebird.map(
        dto.filesData,
        (file) => this.filesService.delete(file.fileName),
        { concurrency: 5 },
      );

      throw new CommonExceptions(e);
    }
  }
}
