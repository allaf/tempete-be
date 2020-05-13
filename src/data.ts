import { Game, GameStatus } from 'model/game.model';

let scholarsmate =
  'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1';

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
    new Game('0', 'partie de phil (0)', phil, scholarsmate),
    new Game('1', 'partie de toto (1)', toto),
  ],

  users: [alex, toto, phil],
};
