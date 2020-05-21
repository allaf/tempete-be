import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from 'mangoose-db/service/todo.service';
import { TodoDocument } from 'mangoose-db/todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}

  @Get('find')
  getGames(): Promise<TodoDocument[]> {
    return this.service.findAll();
  }

  @Get('toto')
  toto() {
    return 'TOTOTOTOT';
  }

  @Post()
  async create(@Body() todo: TodoDocument): Promise<any> {
    console.log('create called with ', todo);
    return this.service.create(todo);
  }

  @Put()
  async update(@Body() todo: TodoDocument): Promise<any> {
    console.log('update called with ', todo);
    return this.service.update(todo);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.service.delete(params.id);
  }
}
