import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import * as mimetype from 'mime-types';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      fileFilter: (req, file, cb) => {
        const ext = mimetype.extension(file.mimetype) as string;
        const allowedExtensions = this.configService.get<Array<string>>(
          'upload.allowedExtensions',
        );

        if (!allowedExtensions.includes(ext)) {
          return cb(new BadRequestException('Unsupported image type'), false);
        }

        cb(null, true);
      },
      storage: diskStorage({
        destination: (res, file, cb) => {
          const path = this.configService.get<string>('upload.path');

          if (!existsSync(path)) {
            mkdirSync(path);
          }

          cb(null, path);
        },

        filename: (req, file, cb) => {
          const uuid = v4();
          const ext = mimetype.extension(file.mimetype);

          cb(null, `${uuid}.${ext}`);
        },
      }),
    };
  }
}
