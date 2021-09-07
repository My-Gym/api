import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Exercise } from '../exercises/exercises.model';
import { WorkoutSet } from './workout-sets.model';

interface WorkoutCreationAttrs {
  date: string;
  userId: number;
  exerciseId: number;
}

@Table({ tableName: 'workouts' })
export class Workout extends Model<Workout, WorkoutCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'DD-MM-YYYY', description: 'Workout date' })
  @Column({ type: DataType.STRING })
  date: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Exercise)
  @Column({ type: DataType.INTEGER })
  exerciseId: number;

  @BelongsTo(() => Exercise)
  exercise: Exercise;

  @HasMany(() => WorkoutSet, { onDelete: 'cascade' })
  workoutSets: WorkoutSet[];
}

/*
 * 1) Получить user id по code
 * 2) Создать воркаут согласно WorkoutCreationAttrs
 * 3) Обработать входные массивы с Sets
 *
 * CreateWorkoutDto {
 *
 * }
 *
 * */
