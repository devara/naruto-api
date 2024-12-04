import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  HttpStatus,
  RequestMethod,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { ConfigService } from '@nestjs/config';
import { AvailableConfigType } from '@/config/config.type';
import SwaggerSetup from '@/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );
  const configService = app.get(ConfigService<AvailableConfigType>);

  const { apiPrefix, port } = configService.getOrThrow('app', { infer: true });

  await app.register(helmet);
  await app.register(fastifyCsrf);
  await app.register(compression);

  app.setGlobalPrefix(apiPrefix, {
    exclude: [
      {
        method: RequestMethod.GET,
        path: '/',
      },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  SwaggerSetup(app);

  await app.listen(port ?? 3000);
}
void bootstrap();
