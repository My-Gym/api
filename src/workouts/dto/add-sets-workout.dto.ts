import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class WorkoutSetsDto {
  planTime?: number;
  planWeight?: number;
  planRepetitions?: number;
}

export class BodyCreateWorkoutSetsDto {
  @ApiProperty({ example: '[{ planTime: 10 }, ...]', description: 'Data sets' })
  @IsString({ message: 'Должно быть строкой' })
  sets: WorkoutSetsDto[];

  @ApiProperty({ example: 10, description: 'Workout Id' })
  @IsNumber({}, { message: 'Должно быть числом' })
  workoutId: number;
}

export class CreateWorkoutSetsDto extends BodyCreateWorkoutSetsDto {
  @ApiProperty({ example: '1573423_VK', description: "User's code" })
  @IsString({ message: 'Должно быть строкой' })
  userCode: string;
}
