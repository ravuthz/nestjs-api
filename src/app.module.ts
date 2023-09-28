import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './knex/knex.module';
import knexConfig from './knex/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
    }),
    KnexModule.forRoot(knexConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
