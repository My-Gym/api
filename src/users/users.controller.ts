import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../roles/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creating a user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Creating a user' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: User })
  @Patch('/add-role')
  async addRole(@Body('role') role: string, @Query('code') code: string) {
    return await this.usersService.addRole({ code, role });
  }

  @ApiOperation({ summary: 'Getting user profile' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get('/get-profile')
  async getProfile(@Query('code') code: string) {
    return await this.usersService.getByCode(code);
  }

  @ApiOperation({ summary: 'Getting user info' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Roles('ADMIN')
  @Get('/:code')
  async getByCode(@Param('code') code: string) {
    return await this.usersService.getByCode(code);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.usersService.getAll();
  }
}
