import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import config from './common/configs/app.config';
import { ProductModule } from './product/product.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { UserModule } from './user/user.module';

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
    AuthModule,
    UserModule,
    CategoryModule,
    SubcategoryModule,
  ],
})
export class AppModule {}
