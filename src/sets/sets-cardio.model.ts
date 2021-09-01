import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Workout } from '../workouts/workouts.model';

interface SetCardioCreationAttrs {
  planWeight: number;
  planNumber: number;
  workout: Workout;
}

@Table({ tableName: 'sets_cardio' })
export class SetCardio extends Model<SetCardio, SetCardioCreationAttrs> {
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

  @ApiProperty({ example: '20', description: 'The actual time' })
  @Column({ type: DataType.INTEGER })
  factTime: number;

  @ForeignKey(() => Workout)
  @Column({ type: DataType.INTEGER })
  workoutId: number;

  @BelongsTo(() => Workout)
  workout: Workout;
}
