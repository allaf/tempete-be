import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('validate user returns', result);
      return result;
    }
    return null;
  }

  async login(user: User) {
    const resp = { ...user, ...{ access_token: this.jwtService.sign(user) } };
    return resp;
  }


  
}
