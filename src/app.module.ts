import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { GlobalExceptionFilter } from 'src/common/exceptions/global.exception-filter';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import config from './common/configs/app.config';
import { SMTPConnectionOptions } from './common/types/smtp.type';
import dataSource from './data-source';
import { ImageModule } from './image/image.module';
import { ProductModule } from './product/product.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isDevelopment =
          config.get<string>('global.nodeEnv') === 'development';

        return Object.assign(dataSource.options, {
          synchronize: isDevelopment,
          logging: isDevelopment ? 'all' : ['error', 'warn'],
          logger: isDevelopment ? 'advanced-console' : 'file',
          maxQueryExecutionTime: 1000,
        });
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transports: [
          configService.get<string>('global.nodeEnv') === 'development'
            ? new winston.transports.Console({
                format: winston.format.combine(
                  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:SS' }),
                  nestWinstonModuleUtilities.format.nestLike('Kersan', {
                    prettyPrint: true,
                  }),
                ),
              })
            : new winston.transports.DailyRotateFile({
                filename: configService.get<string>('log.fileName'),
                dirname: configService.get<string>('log.directoryPath'),
                zippedArchive: true,
                datePattern: 'YYYY-MM-DD-HH',
                maxSize: '50m',
                maxFiles: '14d',
                format: winston.format.combine(
                  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:SS' }),
                  winston.format.printf(
                    ({ level, message, timestamp, stack }) => {
                      return `[${level.toUpperCase()}] — ${timestamp}\t${message}\t${JSON.stringify(
                        stack,
                        null,
                        2,
                      )}`;
                    },
                  ),
                ),
              }),
        ],
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDevelopment =
          config.get<string>('global.nodeEnv') === 'development';
        const transport = config.get<SMTPConnectionOptions>(
          isDevelopment ? 'mailtrap' : 'smtp',
        );
        const mail = config.get<string>('mail.officialMail');

        return {
          transport,
          defaults: {
            from: mail,
          },
        };
      },
    }),
    ProductModule,
    AuthModule,
    UserModule,
    CategoryModule,
    SubcategoryModule,
    ImageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
