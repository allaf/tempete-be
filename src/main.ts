import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Observable, of, interval } from 'rxjs';
// import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  sandbox();
}
bootstrap();

async function sandbox() {
  await console.log('**** sandbox ****');

  // const obs$ = interval(1000).pipe(take(4));

  await f();
  await console.log('**** sandbox ****');

  // await new Promise(resolve => setTimeout(resolve, 5000));
  // console.log('Done!');
}

async function f() {
  return await interval(1)
    .pipe(take(3), tap(console.log))
    .toPromise();
}
