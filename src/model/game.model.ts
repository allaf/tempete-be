import { User } from './user.model';

export enum GameStatus {
  OPEN = 'OPEN',
  PAIRED = 'PAIRED',
  STARTED = 'STARTED',
  FINISHED_MATE = 'FINISHED_MATE',
  FINISHED_RESIGN = 'FINISHED_RESIGN',
}

export class Game {
  id: string;
  turn = Turn.W;
  fenPointer = 0;
  status = GameStatus.OPEN;
  name: string;
  createdBy: User;
  whitePlayer: User;
  blackPlayer?: User;
  position: string;
  fenHistory = [];

  moveHistory = [];
  move: SquareMove;

  private startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  constructor(id?, name?, createdBy?, position?) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.whitePlayer = createdBy;
    this.position = position ? position : this.startFen;
    this.fenHistory = [this.position];
  }

  changeTurn() {
    this.turn = this.turn === Turn.W ? Turn.B : Turn.W;
  }
}

export enum Turn {
  W = 'w',
  B = 'b',
}

export interface PositionChange {
  gameId: string;
  player: string;
  newPos: string;
}

export interface GameUpdate {
  gameId: string;
  position: string;
}

export interface MoveMade {
  source: string;
  target: string;
  newPos: string;
}

export interface SquareMove {
  source: string;
  target: string;
}
