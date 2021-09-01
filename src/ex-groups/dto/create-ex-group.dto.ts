import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExGroupDto {
  @ApiProperty({
    example: 'cardio',
    description: 'technical name',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({
    example: 'Cardio',
    description: 'Exercise group title',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Some text for description exercise group',
    description: 'Exercise description',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
