import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
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
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    let x = this.users.filter(u => u.id === '0');
    console.log(this.users, x);
    console.log(this.users.filter(u => u.id === id)[0]);
    console.log(id);

    return this.users.filter(u => u.id === id)[0];
  }
}
