import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

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

  @Get('obs')
  getInterval() {
    return 'alex';
  }

  @Get('ping')
  ping(): string {
    console.log('ping');
    return '{"ping":"pong"}';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    const res = this.authService.login(req.user);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logout(@Body() body, ) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('/auth/refreshToken')
  async refreshToken(@Body() refreshToken: RefreshToken): Promise<any> {
    this.logger.log('endpoint refreshToken', refreshToken.refreshToken);
    return this.authService.refreshToken(refreshToken.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected() {
    return 'should be protected';
  }
}
