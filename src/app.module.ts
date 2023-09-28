import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from '@common/common.module';
import { AuthModule } from '@auth/auth.module';
import { DbModule } from '@db/db.module';
import { ProductModule } from '@product/product.module';
import { UserModule } from '@user/user.module';
import { CategoryModule } from '@category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    ProductModule,
    CommonModule,
    AuthModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
