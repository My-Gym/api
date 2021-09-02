import { Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercises.model';
import { BodyCreateExerciseDto } from './dto/create-exercise.dto';
import { Roles } from '../roles/roles.decorator';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Creating a exercise' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Exercise })
  @Roles('ADMIN')
  @Post()
  async create(
    @Body() dtoBody: BodyCreateExerciseDto,
    @Query('code') code: string,
  ): Promise<Exercise> {
    return this.exercisesService.create({ ...dtoBody, userCode: code });
  }
}
