import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
     origin: 'localhost', // Add your frontend URL here 
     methods: [ "GET", "POST", "PUT", "DELETE","OPTIONS", "PATCH"],
     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
