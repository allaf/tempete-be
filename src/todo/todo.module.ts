import { Module } from '@nestjs/common';
import { MangooseDbModule } from 'mangoose-db/mangoose-db.module';
import { TodoService } from 'mangoose-db/service/todo.service';
import { todoProviders } from 'mangoose-db/todo.poviders';
import { TodoController } from './todo.controller';

@Module({
  imports: [MangooseDbModule],
  controllers: [TodoController],
  providers: [
      TodoService,
    ...todoProviders
    ],
})
export class TodoModule {}
