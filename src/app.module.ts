import { getConnectionOptions } from 'typeorm';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config/app.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        Object.assign(await getConnectionOptions(), {
          synchronize: config.get<string>('global.nodeEnv') === 'development',
        }),
    }),
    ProductModule,
  ],
})
export class AppModule {}
