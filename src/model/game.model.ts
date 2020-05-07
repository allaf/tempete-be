import { User } from './user.model';

export enum GameStatus {
  OPEN = 'OPEN',
  PAIRED = 'PAIRED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export class Game {
  id: string;
  status: GameStatus;
  name: string;
  boardFen: string;
  createdBy: User;
  whitePlayer: User;
  blackPlayer?: User;
}
