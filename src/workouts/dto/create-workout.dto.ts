import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class BodyCreateWorkoutDto {
  @ApiProperty({ example: 10, description: 'Exercise Id' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly exerciseId: number;

  @ApiProperty({ example: '21-09-2021', description: 'Date workout' })
  @IsDate({ message: 'Должна быть дата' })
  readonly date: string;
}

export class CreateWorkoutDto extends BodyCreateWorkoutDto {
  @ApiProperty({ example: '1573423_VK', description: 'External ID + source' })
  @IsString({ message: 'Должно быть строкой' })
  userCode: string;
}
