import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  // app.enableCors({
    // origin: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,WS',
    // credentials: true,
  // });

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  // console.log('WS adapter in 8080');
  // sandbox();
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
