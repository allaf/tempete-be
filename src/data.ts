import { Game, GameStatus } from 'model/game.model';

interface db {
  gameId: number;
  userId: number;
  games: Game[];
  users: User[];
}

let phil: User = {
  userId: '1',
  username: 'phil',
  password: 'phil',
};

export const db = {
  gameId: 1,
  games: [
    {
      status: GameStatus.OPEN,
      name: 'partie de phil (0)',
      id: '0',
      boardFen: 'start',
      createdBy: phil,
      whitePlayer: phil,
    },
  ],

  users: [
    {
      userId: '0',
      username: 'alex',
      password: 'alex',
    },
    phil,
  ],
};
