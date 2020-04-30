import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
  sandbox();
}
bootstrap();

async function sandbox() {
  console.log('**** sandbox ****');
  await f();
  console.log('**** sandbox ****');
}

async function f() {
  return await interval(1)
    .pipe(take(3), tap(console.log))
    .toPromise();
}
