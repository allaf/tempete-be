import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 0,
        username: 'alex',
        password: 'alex',
      },
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
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

}