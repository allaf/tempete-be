import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  findAllConnected(): Observable<User[]> {
    return 
  }
  refreshTokens = new Map<string, User>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  LoggedInUsers() {
    return;
    // TODO logged in users list
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    this.jwtService.sign(user);

    return null;
  }

  async login(user: User) {
    const token = this.jwtService.sign(user);
    const refreshToken = randomBytes(64).toString('hex');
    const resp = {
      ...user,
      ...{ accessToken: token, refreshToken },
    };

    this.refreshTokens.set(refreshToken, user);

    return resp;
  }

  logout(refreshToken: string) {
    console.log(this.refreshTokens);
    if (this.refreshTokens.has(refreshToken)) {
      this.refreshTokens.delete(refreshToken);
    } else {
      console.log('pas trouvé son refreshToken');
    }
  }

  refreshToken(refreshToken: string) {
    if (this.refreshTokens.has(refreshToken)) {
      const user: User = this.refreshTokens.get(refreshToken);
      return { jwtToken: this.jwtService.sign(user) };
    } else {
      console.log('401 car refreshToken non trouvé sur le serveur');
      throw new UnauthorizedException();
    }
  }
}
