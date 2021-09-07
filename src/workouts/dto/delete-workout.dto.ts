import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteWorkoutDto {
  @ApiProperty({ example: '1573423_VK', description: 'External ID + source' })
  @IsString({ message: 'Должно быть строкой' })
  userCode: string;

  @ApiProperty({ example: 10, description: 'Workout Id' })
  @IsNumber({}, { message: 'Должно быть числом' })
  workoutId: number;
}
