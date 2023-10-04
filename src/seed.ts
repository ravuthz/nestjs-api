import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './typeorm/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  try {
    await app.get(SeederService).run();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
