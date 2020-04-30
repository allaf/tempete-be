import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginGuard } from 'auth/guard/login.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

interface RefreshToken {
  refreshToken: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  affiche(x, y) {
    console.log('AFFICHE ', x, y);
  }

  @Get('ping')
  ping(@Request() req): string {
    return '{"ping":"pong"}';
  }

  // TODO mattre les auth dans un controller auth
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req) {
    let res = this.authService.login(req.user);
    console.log(req.sessionStore.sessions);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logout(@Body() body, @Request() req) {
    req.logout();
    return this.authService.logout(body.refreshToken);
  }

  @Post('/auth/refreshToken')
  async refreshToken(@Body() refreshToken: RefreshToken): Promise<any> {
    console.log('ENDPOINT REFRESH TOKEN.');
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Request() req) {
    return 'should be protected';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
