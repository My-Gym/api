import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Workout } from './workouts.model';
import { BodyCreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutsService } from './workouts.service';
import { BodyCreateWorkoutSetsDto } from './dto/add-sets-workout.dto';

@ApiTags('Workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @ApiOperation({ summary: 'Creating a workout' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Workout })
  @Post()
  async create(
    @Body() dto: BodyCreateWorkoutDto,
    @Query('code') code: string,
  ): Promise<Workout> {
    return this.workoutService.create({ ...dto, userCode: code });
  }

  @ApiOperation({ summary: 'Add a sets' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: Workout })
  @Post('/add-sets')
  async addSets(
    @Body() dto: BodyCreateWorkoutSetsDto,
    @Query('code') code: string,
  ): Promise<Workout> {
    return this.workoutService.addSets({ ...dto, userCode: code });
  }

  @ApiOperation({ summary: 'Creating a workout' })
  @ApiResponse({ status: HttpStatus.GONE })
  @Delete('/:workoutId')
  async delete(
    @Param('workoutId') workoutId: number,
    @Query('code') code: string,
  ): Promise<number> {
    return this.workoutService.delete({ workoutId, userCode: code });
  }
}
