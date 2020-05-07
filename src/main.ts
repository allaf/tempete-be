import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppModule } from './app.module';
import { Put } from '@nestjs/common';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug'],
  });
  app.enableCors({
    // methods:['GET','PUT','POST','OPTION', 'DELETE']
  });
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

async function sandbox() {
  console.log('**** sandbox ****');
  console.log('**** sandbox ****');
}

async function f() {
  return await interval(1)
    .pipe(take(3), tap(console.log))
    .toPromise();
}
