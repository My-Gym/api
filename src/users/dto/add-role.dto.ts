import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: '12345_VK', description: 'User code with source' })
  @IsString({ message: 'Должно быть строкой' })
  readonly code: string;

  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'ADMIN', description: "User's role" })
  readonly role: string;
}
