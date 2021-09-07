import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BodyCreateUserDto {
  @ApiProperty({ example: 'Alexander', description: 'User first name' })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName: string;

  @ApiProperty({ example: 'Cheprasov', description: 'User last name' })
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName: string;

  @ApiProperty({ example: 78945612309, description: "Users's phone number" })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly phone?: number;
}

export class CreateUserDto extends BodyCreateUserDto {
  @ApiProperty({ example: '123456_VK', description: 'User code' })
  @IsString({ message: 'Должно быть строкой' })
  code: string;
}
