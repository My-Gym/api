import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as Bluebird from 'bluebird';
import { Workout } from './workouts.model';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { User } from '../users/users.model';
import { DeleteWorkoutDto } from './dto/delete-workout.dto';
import { UsersService } from '../users/users.service';
import { CreateWorkoutSetsDto } from './dto/add-sets-workout.dto';
import { WorkoutSet } from './workout-sets.model';
import { UpdateWorkoutSetsDto } from './dto/update-sets-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout) private workoutRepository: typeof Workout,
    @InjectModel(WorkoutSet) private workoutSetRepository: typeof WorkoutSet,
    @InjectModel(User) private userRepository: typeof User,
    private userService: UsersService,
  ) {}

  async create(dto: CreateWorkoutDto): Promise<Workout> {
    const user = await this.userService.getByCode(dto.userCode);

    const workout = await this.workoutRepository.findAll({
      where: {
        exerciseId: dto.exerciseId,
        date: dto.date,
        userId: user.id,
      },
    });

    if (workout.length !== 0) {
      throw new HttpException(
        'У вас уже запланирована данная тренировка на этот день',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.workoutRepository.create({
        exerciseId: dto.exerciseId,
        date: dto.date,
        userId: user.id,
      });
    } catch (e) {
      throw new HttpException(
        'Во время создания тренировки произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(dto: DeleteWorkoutDto): Promise<number> {
    const user = await this.userService.getByCode(dto.userCode);

    return await this.workoutRepository.destroy({
      where: {
        id: dto.workoutId,
        userId: user.id,
      },
    });
  }

  async addSets(dto: CreateWorkoutSetsDto): Promise<Workout> {
    const workout = await this.findOnePersonal(dto.workoutId, dto.userCode);
    const preparationSets = dto.sets.map((set) => ({
      ...set,
      workoutId: dto.workoutId,
    }));

    const workoutSets = await this.workoutSetRepository.bulkCreate(
      preparationSets,
    );

    await workout.$add('workoutSets', workoutSets);

    return await this.findOnePersonal(dto.workoutId, dto.userCode);
  }

  async findOnePersonal(workoutId: number, userCode: string): Promise<Workout> {
    const user = await this.userService.getByCode(userCode);

    const workout = await this.workoutRepository.findOne({
      where: {
        userId: user.id,
        id: workoutId,
      },
      include: WorkoutSet,
    });

    if (!workout) {
      throw new HttpException(
        `Тренировка с id: ${workoutId} - не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return workout;
  }

  async findAllPersonal(userCode: string): Promise<Workout[]> {
    const user = await this.userService.getByCode(userCode);

    return await this.workoutRepository.findAll({
      where: { userId: user.id },
      include: WorkoutSet,
    });
  }

  async updatePersonalSets(dto: UpdateWorkoutSetsDto): Promise<Workout> {
    const workout = await this.findOnePersonal(dto.workoutId, dto.userCode);

    await Bluebird.map(dto.sets, async (set) => {
      const foundSet = await this.workoutSetRepository.findOne({
        where: {
          id: set.id,
          workoutId: workout.id,
        },
      });

      if (!foundSet) {
        throw new HttpException(
          `Подход с id: ${set.id} - не найден!`,
          HttpStatus.NOT_FOUND,
        );
      }

      await foundSet.update(set);
      await foundSet.save();
    });

    return await this.findOnePersonal(dto.workoutId, dto.userCode);
  }
}
