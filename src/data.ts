interface db {
  gameId: number;
  userId: number;
  games: Game[];
  users: User[];
}

export const db = {
  gameId: 0,
  games: [
    // {
    //   name: 'partie de alex',
    //   id: '45',
    //   createdBy: '0',
    //   boardFen: 'start',
    // },
    // {
    //   name: 'partie de phil',
    //   id: '15',
    //   createdBy: '1',
    //   boardFen:
    //     'r3kb1r/ppp2p1p/2p2np1/4p3/3qP3/5Q1P/PPPP1P1P/RNB1K2R w KQkq - 1 8',
    // },
  ],

  users: [
    {
      id: '0',
      userId: '0',
      username: 'alex',
      password: 'alex',
    },
    {
      id: '1',
      userId: '0',
      username: 'phil',
      password: 'phil',
    },
    {
      id: '2',
      username: 'chris',
      password: 'secret',
    },
    {
      id: '3',
      username: 'maria',
      password: 'guess',
    },
  ],
};
