import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [`.env.stage.${process.env.STAGE}`]
    // }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-cool-mountain-a1p6mxqk-pooler.ap-southeast-1.aws.neon.tech',
      port: 5432,
      username: 'default',
      password: 'RQTBj1IW0FAY',
      database: 'verceldb',
      autoLoadEntities: true,
    }),
    AuthModule
  ],
})
export class AppModule { }
