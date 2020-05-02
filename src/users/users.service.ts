import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
 
  private readonly users: User[] = [
    {
      id: '0',
      username: 'alex',
      password: 'alex',
    },
    {
      id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'chris',
      password: 'secret',
    },
    {
      id: '3',
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor() {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const x = this.users.filter(u => u.id === '0');
    console.log(this.users, x);
    console.log(this.users.filter(u => u.id === id)[0]);
    console.log(id);

    return this.users.filter(u => u.id === id)[0];
  }
}
