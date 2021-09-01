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
import { SetStrength } from '../sets/sets-strength.model';
import { SetCardio } from '../sets/sets-cardio.model';

interface WorkoutCreationAttrs {
  title: string;
  description: string;
  value: string;
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

  @ForeignKey(() => SetStrength)
  @Column({ type: DataType.INTEGER })
  setStrengthId: number;

  @HasMany(() => SetStrength)
  setsStrength: SetStrength[];

  @ForeignKey(() => SetCardio)
  @Column({ type: DataType.INTEGER })
  setCardioId: number;

  @HasMany(() => SetCardio)
  setsCardio: SetCardio[];
}
