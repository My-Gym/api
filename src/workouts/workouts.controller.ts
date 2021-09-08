import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Workout } from './workouts.model';
import { BodyCreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutsService } from './workouts.service';
import { BodyCreateWorkoutSetsDto } from './dto/add-sets-workout.dto';
import { BodyUpdateWorkoutSetsDto } from './dto/update-sets-workout.dto';

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
  @Patch('/add-sets')
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

  @ApiOperation({ summary: 'Getting personal workouts' })
  @ApiResponse({ status: HttpStatus.OK, type: [Workout] })
  @Get('/get-personal')
  async getAllPersonal(@Query('code') code: string): Promise<Workout[]> {
    return this.workoutService.findAllPersonal(code);
  }

  @ApiOperation({ summary: 'Updating personal workout sets by workout id' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: Workout })
  @Patch('/update-personal-sets/:workoutId')
  async updatePersonalSets(
    @Param('workoutId') workoutId: number,
    @Body() dto: BodyUpdateWorkoutSetsDto,
    @Query('code') code: string,
  ): Promise<Workout> {
    return this.workoutService.updatePersonalSets({
      ...dto,
      userCode: code,
      workoutId,
    });
  }
}
