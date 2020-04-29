import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

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

  @Get('ping')
  ping(): string {
    return '{"ping":"pong"}';
  }

  // TODO mattre les auth dans un controller auth
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('auth/logout')
  async logout(@Body() body) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('/auth/refreshToken')
  async refreshToken(
    @Body() refreshToken: RefreshToken,
  ): Promise<any> {
    //FIXME old token ne devrait plus marcher !
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
