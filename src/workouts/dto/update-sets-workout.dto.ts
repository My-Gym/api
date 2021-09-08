import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class WorkoutSetsForUpdateDto {
  planTime?: number;
  planWeight?: number;
  planRepetitions?: number;
  factTime?: number;
  factWeight?: number;
  factRepetitions?: number;
  id: number;
}

export class BodyUpdateWorkoutSetsDto {
  @ApiProperty({
    example: '[{ id: 1, planTime: 10 }, ...]',
    description: 'Data sets',
  })
  sets: WorkoutSetsForUpdateDto[];
}

export class UpdateWorkoutSetsDto extends BodyUpdateWorkoutSetsDto {
  @ApiProperty({ example: '1573423_VK', description: "User's code" })
  @IsString({ message: 'Должно быть строкой' })
  userCode: string;

  @ApiProperty({ example: 10, description: 'Workout Id' })
  @IsNumber({}, { message: 'Должно быть числом' })
  workoutId: number;
}
