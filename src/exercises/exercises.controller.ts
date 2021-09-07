import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercises.model';
import { BodyCreateExerciseDto, File } from './dto/create-exercise.dto';
import { Roles } from '../roles/roles.decorator';
import { FilesService } from '../files/files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as Bluebird from 'bluebird';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(
    private exercisesService: ExercisesService,
    private filesService: FilesService,
  ) {}

  @ApiOperation({ summary: 'Getting a exercises' })
  @ApiResponse({ status: HttpStatus.OK, type: [Exercise] })
  @Get()
  getAll(): Promise<Exercise[]> {
    return this.exercisesService.getAll();
  }

  @ApiOperation({ summary: 'Getting the exercise by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Exercise })
  @Get('/:id')
  getById(@Param('id') id: number): Promise<Exercise> {
    return this.exercisesService.getById(id);
  }

  @ApiOperation({ summary: 'Creating a exercise' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Exercise })
  @Roles('ADMIN')
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() dtoBody: BodyCreateExerciseDto,
    @Query('code') code: string,
    @UploadedFiles() files: File[],
  ): Promise<Exercise> {
    const filesData = await Bluebird.map(
      files,
      (file) => this.filesService.load(file),
      { concurrency: 5 },
    );

    return this.exercisesService.create({
      ...dtoBody,
      userCode: code,
      filesData,
    });
  }
}
