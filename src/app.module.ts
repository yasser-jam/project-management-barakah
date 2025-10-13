import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TaskStatusModule } from './task-status/task-status.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TaskStatusModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
