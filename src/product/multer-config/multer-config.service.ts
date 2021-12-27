import { existsSync, mkdirSync } from 'fs';
import { extension } from 'mime-types';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  static allowedFileTypes: Array<string> = ['jpg', 'jpeg', 'png'];

  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      fileFilter: (req, file, cb) => {
        console.log(extension);
        const ext = extension(file.mimetype) as string;

        if (!MulterConfigService.allowedFileTypes.includes(ext)) {
          return cb(new Error('Unsupported image type'), false);
        }

        cb(null, true);
      },
      storage: diskStorage({
        destination: (res, file, cb) => {
          const path = process.env.UPLOADS_FOLDER;

          if (!existsSync(path)) {
            mkdirSync(path);
          }

          cb(null, path);
        },

        filename: (req, file, cb) => {
          const uuid = v4();
          const ext = extension(file.mimetype);

          cb(null, `${uuid}.${ext}`);
        },
      }),
    };
  }
}
