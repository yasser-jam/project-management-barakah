import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable JWT authentication
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
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customJs: [
      'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
    customSiteTitle: 'Projy Project Management System API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 School Management System API is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 API Documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();
