import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Exercise } from './exercises.model';
import { FileData } from './dto/create-exercise.dto';

interface ExContentsCreationAttrs extends FileData {
  exerciseId: number;
}

@Table({ tableName: 'ex-contents' })
export class ExContent extends Model<ExContent, ExContentsCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'video',
    description: 'Type content',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @ApiProperty({
    example: 'someFileName',
    description: 'File name',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  fileName: string;

  @ApiProperty({
    example: 'jpg',
    description: 'File extension',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  extension: string;

  @ForeignKey(() => Exercise)
  @Column({ type: DataType.INTEGER })
  exerciseId: number;

  @BelongsTo(() => Exercise)
  exercise: Exercise;
}
