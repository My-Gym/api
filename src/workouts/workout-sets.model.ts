import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Workout } from './workouts.model';

export interface WorkoutSetCreationAttrs {
  planTime?: number;
  planWeight?: number;
  planRepetitions?: number;
  workoutId: number;
}

@Table({ tableName: 'workout_sets' })
export class WorkoutSet extends Model<WorkoutSet, WorkoutSetCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 3600, description: 'Planned time' })
  @Column({ type: DataType.INTEGER })
  planTime: number;

  @ApiProperty({ example: '20', description: 'Actual time' })
  @Column({ type: DataType.INTEGER })
  factTime: number;

  @ApiProperty({ example: 30, description: 'Planned weight' })
  @Column({ type: DataType.INTEGER })
  planWeight: number;

  @ApiProperty({ example: 30, description: 'Actual weight' })
  @Column({ type: DataType.INTEGER })
  factWeight: number;

  @ApiProperty({ example: 15, description: 'Planned repetitions' })
  @Column({ type: DataType.INTEGER })
  planRepetitions: number;

  @ApiProperty({ example: 15, description: 'Actual repetitions' })
  @Column({ type: DataType.INTEGER })
  factRepetitions: number;

  @ForeignKey(() => Workout)
  @Column({ type: DataType.INTEGER })
  workoutId: number;
  @BelongsTo(() => Workout)
  workout: Workout;
}
