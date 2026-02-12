import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './response/response.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  await app.listen(process.env.PORT ?? 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
