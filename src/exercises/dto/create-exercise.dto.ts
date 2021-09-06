import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BodyCreateExerciseDto {
  @ApiProperty({
    example: 'cardio',
    description: 'Exercise group',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly group: string;

  @ApiProperty({
    example: 'Running',
    description: 'Exercise title',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Running in forest',
    description: 'Exercise description',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({
    example: 'strength',
    description: 'Sets type',
    enum: ['strength', 'cardio'],
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly setsType: string;
}

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string;
}

export class FileData {
  fileName: string;
  type: string;
  extension: string;
}

export class CreateExerciseDto extends BodyCreateExerciseDto {
  @ApiProperty({
    example: '123456_VK',
    description: 'User code',
  })
  @IsString({ message: 'Должно быть строкой' })
  userCode: string;

  @ApiProperty({
    example: '[{ fileName: "SomeFileName", type: "image", extension: "jpg" }]',
    description: 'Array with files data',
  })
  filesData: FileData[];
}
