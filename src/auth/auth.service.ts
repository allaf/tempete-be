import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

class UserRefreshToken {
  user: User;
  refreshToken: string;

  constructor(user: User, token: string) {
    this.refreshToken = token;
    this.user = user;
  }
}

@Injectable()
export class AuthService {
  findAllConnected(): Observable<User[]> {
    return;
  }
  // refreshTokens = new Map<string, User>();
  refreshTokens: UserRefreshToken[] = [];

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  loggedInUsers(): User[] {
    return this.refreshTokens.map((x: UserRefreshToken) => x.user);
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
    //TODO enlever les anciens token du même user
    const token = this.jwtService.sign(user);
    const refreshToken = randomBytes(64).toString('hex');
    const resp = {
      ...user,
      ...{ accessToken: token, refreshToken },
    };

    this.refreshTokens = this.refreshTokens.filter(x => x.user.id !== user.id);
    this.refreshTokens.push(new UserRefreshToken(user, refreshToken));

    return resp;
  }

  logout(refreshToken: string, userId?: string) {
    if (this.hasRT(refreshToken)) {
      this.removeRT(refreshToken);
    } else {
      console.log('pas trouvé son refreshToken');
    }
  }

  private hasRT(refreshToken: string) {
    return this.refreshTokens.find(
      (x: UserRefreshToken) => x.refreshToken === refreshToken,
    );
  }

  private removeRT(refreshToken: string) {
    let x = this.refreshTokens.filter(
      (x: UserRefreshToken) => x.refreshToken !== refreshToken,
    );
    this.refreshTokens = x;
  }

  refreshToken(refreshToken: string) {
    console.log('tokens:', this.refreshTokens);
    if (this.hasRT(refreshToken)) {
      console.log('refreshToken trouvé, clenauing up')
      const userRefreshToken = this.refreshTokens.find(
        (x: UserRefreshToken) => x.refreshToken === refreshToken,
      );
      return { jwtToken: this.jwtService.sign(userRefreshToken.user) };
    } else {
      console.log('401 car refreshToken non trouvé sur le serveur');
      throw new UnauthorizedException();
    }
  }
}
