import { Injectable } from '@nestjs/common';
import { db } from 'data';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return db.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return db.users;
  }

  async findById(id: string): Promise<User> {
    const x = db.users.filter(u => u.id === '0');
    console.log(db.users, x);
    console.log(db.users.filter(u => u.id === id)[0]);
    console.log(id);

    return db.users.filter(u => u.id === id)[0];
  }
}
