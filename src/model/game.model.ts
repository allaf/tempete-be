import { User } from './user.model';

export enum GameStatus {
  OPEN = 'OPEN',
  PAIRED = 'PAIRED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export class Game {
  id: string;
  turn = Turn.W;
  fenHistory = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
  fenPointer = 0;
  status = GameStatus.OPEN;
  name: string;
  createdBy: User;
  whitePlayer: User;
  blackPlayer?: User;
  position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  constructor(id, name, createdBy) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.whitePlayer = createdBy;
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
