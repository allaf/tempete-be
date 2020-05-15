import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from '../auth/constants';
import { DataService } from '../data-service/data.service';
import { UserService } from '../users/user.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { WsModule } from '../ws/ws.module';

describe('Game Controller', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WsModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.tokenExpires },
        }),
      ],
      providers: [DataService, UserService, GameService],
      controllers: [GameController],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
