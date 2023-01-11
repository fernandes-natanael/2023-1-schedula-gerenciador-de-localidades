import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';

const configService = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.database.host,
      port: configService.database.port,
      username: configService.database.user,
      password: configService.database.pass,
      database: configService.database.db,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      ...(process.env.ENVIRONMENT === 'PRODUCTION' && {
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
