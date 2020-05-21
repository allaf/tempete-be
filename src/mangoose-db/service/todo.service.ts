import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TodoDocument } from '../todo.schema';
import { TodoDto } from 'model/todo.model';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_MODEL')
    private todoModel: Model<TodoDocument>,
  ) {}

  async create(todo: TodoDocument): Promise<TodoDocument> {
    const createdCat = new this.todoModel(todo);
    return createdCat.save();
  }

  async update(todo: TodoDocument): Promise<TodoDocument> {
    const filter = { _id: todo._id };
    // const update = { completed: !todo.completed };
    return this.todoModel.findOneAndUpdate(filter, todo).exec();
  }

  async delete(id): Promise<any> {
    console.log('DELETE', id);
    return this.todoModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<TodoDocument[]> {
    return this.todoModel.find().exec();
  }
}
