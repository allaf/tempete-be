import { Game, GameStatus } from 'model/game.model';

interface db {
  gameId: number;
  userId: number;
  games: Game[];
  users: User[];
}

let alex = {
  userId: '0',
  username: 'alex',
  password: 'alex',
};
let phil = {
  userId: '1',
  username: 'phil',
  password: 'phil',
};
let toto = {
  userId: '2',
  username: 'toto',
  password: 'toto',
};

export const db = {
  gameId: 2,
  games: [
    new Game('0', 'partie de phil (0)', phil),
    new Game('1', 'partie de toto (1)', toto),
  ],

  users: [alex, toto, phil],
};
