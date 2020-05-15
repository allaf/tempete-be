import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

const PORT = 3000;

async function sandbox() {
  console.log('**** sandbox ****');
  console.log('**** sandbox ****');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug'],
  });
  app.enableCors({});
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  sandbox();
}
bootstrap();
