import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { db } from 'data';
import { DataService } from 'data-service/data.service';
import { Game, GameStatus, PositionChange, GameUpdate } from 'model/game.model';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserService } from 'users/user.service';
import { WSGateway } from 'ws/ws.gateway';
import { GameService } from './game.service';
import { Chess } from 'chess.js';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  private readonly logger = new Logger(GameController.name);

  posChangeObs: Observable<any>;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private gameService: GameService,
    private wsg: WSGateway,
  ) {
    this.gameService.findById('0');
    this.posChangeObs = this.wsg.getGameChange();
    this.posChangeObs
      .pipe(
        filter(x => x),
        tap(x => this.traiterGameChange(x)),
      )
      .subscribe();
    // TODO new Chess();
    // const chess = new Chess();
    // console.log(chess.turn());
    // chess.move('e4');
    // console.log(chess.turn());
  }

  private traiterGameChange(game: Game) {
    // update game in db (clients will update through the socket directly !)
    this.gameService.update(game);

    //TODO braodcast change to all clients
    this.wsg.emit('gameChange', game);
  }

  @Get('list')
  getGames(@Request() req): Observable<Game[]> {
    return of(db.games);
  }

  @Get(':id')
  findOne(@Param() params): Game {
    return this.gameService.findById(params.id);
  }

  @Put(':id/join')
  joinpost(@Body() Body, @Request() req, @Param() params): Game {
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);
    game.blackPlayer = user;
    game.status = GameStatus.STARTED;

    return game;
  }

  @Delete(':id')
  delete(@Body() Body, @Request() req, @Param() params) {
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);

    // TODO in gamService
    // TODO game not found, user not found 404
    if (game.createdBy.userId !== user.userId)
      throw new UnauthorizedException('not your game');

    if (game.status !== GameStatus.OPEN)
      throw new UnauthorizedException('status not OPEN');

    this.dataService.deleteGame(game.id);
  }

  @Post()
  async create(@Request() req) {
    const user: User = await this.userService.findById(req.user.userId);
    const game = new Game(
      '' + db.gameId++,
      'partie de ' + req.user.username + ' (' + db.gameId + ')',
      user,
    );
    db.games.push(game);

    return game;
  }
}
