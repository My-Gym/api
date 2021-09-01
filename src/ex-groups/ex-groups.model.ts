import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from '../exercises/exercises.model';

interface ExerciseCreationAttrs {
  title: string;
  description: string;
  value: string;
}

@Table({ tableName: 'ex_groups' })
export class ExGroup extends Model<ExGroup, ExerciseCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'cardio',
    description: 'Technical name',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Cardio',
    description: 'Exercise group title',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Some text for description exercise group',
    description: 'Exercise group description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Exercise)
  exercises: Exercise[];
}
