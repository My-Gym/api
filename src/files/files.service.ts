import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { File, FileData } from '../exercises/dto/create-exercise.dto';

const FILE_PATH = path.resolve(__dirname, '..', 'static');

@Injectable()
export class FilesService {
  async load(file: File): Promise<FileData> {
    const fileType = file.mimetype.split('/');
    const fileName = uuid.v4() + `.${fileType[1]}`;

    if (!fs.existsSync(FILE_PATH)) {
      fs.mkdirSync(FILE_PATH, { recursive: true });
    }

    try {
      fs.writeFileSync(path.join(FILE_PATH, fileName), file.buffer);
      return { fileName, type: fileType[0], extension: fileType[1] };
    } catch (e) {
      throw new HttpException(
        'При записи файла произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(fileName: string): Promise<{ status: boolean }> {
    try {
      await fs.rmSync(path.join(FILE_PATH, fileName));
      return { status: true };
    } catch (e) {
      console.log(e);
      return { status: false };
    }
  }
}
