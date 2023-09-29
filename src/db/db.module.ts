import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvironmentVariables } from '@common/config/environment.variables';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        const environment = configService.get('ENVIRONMENT');
        const synchronize = Boolean(configService.get('DB_SYNCHRONIZE'));
        const migrationsRun = Boolean(configService.get('DB_MIGRATIONS_RUN'));
        const autoLoadEntities = Boolean(
          configService.get('DB_AUTOLOADENTITIES'),
        );

        const isProduction = environment === 'production';

        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          database: process.env.DB_NAME,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          migrationsRun,
          ssl: isProduction,
          autoLoadEntities,
          synchronize,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
