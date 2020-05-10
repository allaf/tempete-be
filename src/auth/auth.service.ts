import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UserService } from '../users/user.service';

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
  private readonly logger = new Logger(AuthService.name);

  refreshTokens: UserRefreshToken[] = [];

  constructor(
    private usersService: UserService,
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

    return user;
  }

  async login(user: User) {
    const token = this.jwtService.sign(user);
    const refreshToken = randomBytes(64).toString('hex');
    const resp = {
      ...user,
      ...{ accessToken: token, refreshToken },
    };

    this.removeUserToken(user);

    this.refreshTokens.push(new UserRefreshToken(user, refreshToken));

    return resp;
  }

  private removeUserToken(userId) {
    this.refreshTokens = this.refreshTokens.filter(
      x => x.user.userId !== userId,
    );
  }

  logout(refreshToken: string, userId?: string) {
    if (this.hasRT(refreshToken)) {
      this.removeRT(refreshToken);
    } else {
      this.logger.debug('pas trouvé son refreshToken');
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
    if (this.hasRT(refreshToken)) {
      const userRefreshToken = this.refreshTokens.find(
        (x: UserRefreshToken) => x.refreshToken === refreshToken,
      );
      return { jwtToken: this.jwtService.sign(userRefreshToken.user) };
    } else {
      throw new UnauthorizedException();
    }
  }
}
