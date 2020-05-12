import { Injectable } from '@nestjs/common';
import { db } from 'data';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<User> {
    return db.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return db.users;
  }

  findById(id: string): User {
    return db.users.find(u => u.userId === id);
  }
}
