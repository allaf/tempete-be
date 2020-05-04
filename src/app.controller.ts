import { Body, Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { LoginGuard } from 'auth/guard/login.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// import { AuthenticatedGuard } from 'auth/guard/auth.guard';

interface RefreshToken {
  refreshToken: string;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {
    this.logger.log('LOG !!!!!!!!');
    this.logger.warn('WARN !!!!!!!!');
    this.logger.debug('DEBUG !!!!!!!!');
    this.logger.error('ERROR :::');
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(@Request() req): string {
    console.log('ping');
    return '{"ping":"pong"}';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    let res = this.authService.login(req.user);
    console.log(req.sessionStore.sessions);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logout(@Body() body, @Request() req) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('/auth/refreshToken')
  async refreshToken(@Body() refreshToken: RefreshToken): Promise<any> {
    this.logger.log('endpoint refreshToken',refreshToken.refreshToken)
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Request() req) {
    return 'should be protected';
  }
}
