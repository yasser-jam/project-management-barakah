import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API documentation for the Project Management application')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('app', 'Application endpoints')
    .addTag('projects', 'Project management endpoints')
    .addTag('tasks', 'Task management endpoints')
    .addTag('task-status', 'Task status endpoints')
    .addTag('invitations', 'Project invitation endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
