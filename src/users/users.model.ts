import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UsersRoles } from './users-roles.model';
import { Exercise } from '../exercises/exercises.model';
import { Workout } from '../workouts/workouts.model';

interface UserCreationAttrs {
  externalId: number;
  source: string;
  code: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1573423', description: 'External ID' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  externalId: number;

  @ApiProperty({ example: 'Alexander', description: 'User first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Cheprasov', description: 'User last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: '1573423_VK', description: 'External ID + source' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @ApiProperty({ example: 'VK', description: 'Source' })
  @Column({ type: DataType.STRING, allowNull: false })
  source: string;

  @ApiProperty({ example: true, description: 'Is user in ban?' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: 'User used bad words',
    description: 'Reason for the ban',
  })
  @Column({ type: DataType.STRING })
  banReason: string;

  @BelongsToMany(() => Role, () => UsersRoles)
  roles: Role[];

  @HasMany(() => Exercise)
  exercises: Exercise[];

  @HasMany(() => Workout)
  workouts: Workout[];
}
