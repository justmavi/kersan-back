import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';

import config from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        synchronize: config.get<string>('global.nodeEnv') === 'development',
      }),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
})
export class AppModule {}
