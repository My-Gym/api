import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExGroup } from './ex-groups.model';
import { ExGroupsService } from './ex-groups.service';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { Roles } from '../roles/roles.decorator';

@ApiTags('ExGroups')
@Controller('ex-groups')
export class ExGroupsController {
  constructor(private exGroupsService: ExGroupsService) {}

  @ApiOperation({ summary: 'Creating a exercise group' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ExGroup })
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateExGroupDto): Promise<ExGroup> {
    return this.exGroupsService.create(dto);
  }
}
