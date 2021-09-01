import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 123456, description: 'Eternal Id' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly externalId: number;

  @ApiProperty({ example: 'VK', description: 'User source' })
  @IsString({ message: 'Должно быть строкой' })
  readonly source: string;

  @ApiProperty({ example: 'Alexander', description: 'User first name' })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName: string;

  @ApiProperty({ example: 'Cheprasov', description: 'User last name' })
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName: string;
}
