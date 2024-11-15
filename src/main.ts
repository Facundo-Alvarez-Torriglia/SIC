import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const app = await NestFactory.create(AppModule)
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: true,
    preflightContinue: false,
  }
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)
  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
