import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AvailableConfigType } from './config.type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function SwaggerSetup(app: INestApplication) {
  const {
    name: appName,
    url: appUrl,
    version: appVersion,
  } = app
    .get(ConfigService<AvailableConfigType>)
    .getOrThrow('app', { infer: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Iki API isine data naruto tukang ceramah no jutsu')
    .setVersion(appVersion)
    .addServer(appUrl, 'Development')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
}
