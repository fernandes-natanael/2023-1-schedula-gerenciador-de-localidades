import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module, CacheModule } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { WorkstationsModule } from './workstations/workstations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      // port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      ...(process.env.ENVIRONMENT === 'PRODUCTION' && {
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    CacheModule.register({ isGlobal: true }),
    CitiesModule,
    WorkstationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
