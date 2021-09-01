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

interface SetStrengthCreationAttrs {
  planWeight: number;
  planNumber: number;
  workout: Workout;
}

@Table({ tableName: 'sets_strength' })
export class SetStrength extends Model<SetStrength, SetStrengthCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '20', description: 'Planned weight' })
  @Column({ type: DataType.INTEGER })
  planWeight: number;

  @ApiProperty({ example: '20', description: 'The actual weight' })
  @Column({ type: DataType.INTEGER })
  factWeight: number;

  @ApiProperty({ example: '20', description: 'Planned number of repetitions' })
  @Column({ type: DataType.INTEGER })
  planNumber: number;

  @ApiProperty({
    example: '20',
    description: 'The actual number of repetitions',
  })
  @Column({ type: DataType.INTEGER })
  factNumber: number;

  @ForeignKey(() => Workout)
  @Column({ type: DataType.INTEGER })
  workoutId: number;

  @BelongsTo(() => Workout)
  workout: Workout;
}
