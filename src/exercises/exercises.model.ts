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
import { ExGroup } from '../ex-groups/ex-groups.model';
import { User } from '../users/users.model';
import { Workout } from '../workouts/workouts.model';

interface ExerciseCreationAttrs {
  title: string;
  description: string;
  exGroupId: number;
  authorId: number;
}

@Table({ tableName: 'exercises' })
export class Exercise extends Model<Exercise, ExerciseCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Squats with a barbell',
    description: 'Exercise title',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Some text for description exercise',
    description: 'Exercise title',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 'strength',
    description: 'Type sets in exercise',
    enum: ['strength', 'cardio'],
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    values: ['strength', 'cardio'],
  })
  setsType: string;

  @ForeignKey(() => ExGroup)
  @Column({ type: DataType.INTEGER })
  exGroupId: number;

  @BelongsTo(() => ExGroup)
  group: ExGroup;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Workout)
  workouts: Workout[];
}
