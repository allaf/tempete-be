import { Game } from './model/game.model';

interface Db {
  gameId: number;
  games: Game[];
  users: User[];
}

const alex = {
  userId: '0',
  username: 'alex',
  password: 'alex',
};
const phil = {
  userId: '1',
  username: 'phil',
  password: 'phil',
};
const toto = {
  userId: '2',
  username: 'toto',
  password: 'toto',
};

function createScholarMateGame() {
  const g = new Game('0', 'partie de phil (0)', phil);
  g.position = 'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR';
  g.fenHistory = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    'rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2',
    'r1bqkbnr/pppp1ppp/2n5/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 2 3',
    'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
  ];
  g.fenPointer = g.fenHistory.length - 1;

  g.moveHistory = [
    { source: 'e2', target: 'e4' }, // w
    { source: 'e7', target: 'e5' }, // b
    { source: 'd1', target: 'h5' }, // w
    { source: 'b8', target: 'c6' }, // b
    { source: 'f1', target: 'c4' }, // w
  ];
  g.move = g.moveHistory[g.moveHistory.length - 1];

  return g;
}

export const db: Db = {
  gameId: 2,
  games: [createScholarMateGame(), new Game('1', 'partie de toto (1)', toto)],

  users: [alex, toto, phil],
};
