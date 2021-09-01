import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExGroupDto } from './dto/create-ex-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ExGroup } from './ex-groups.model';
import { CommonExceptions } from '../exceptions/common.exceptions';

@Injectable()
export class ExGroupsService {
  constructor(
    @InjectModel(ExGroup) private exGroupRepository: typeof ExGroup,
  ) {}

  async create(dto: CreateExGroupDto): Promise<ExGroup> {
    try {
      return await this.exGroupRepository.create(dto);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          `Данная группа существует`,
          HttpStatus.CONFLICT,
        );
      }
      throw new CommonExceptions(e);
    }
  }

  getByValue(value: string): Promise<ExGroup> {
    return this.exGroupRepository.findOne({ where: { value } });
  }
}
