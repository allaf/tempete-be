import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'data';
import { Game } from 'model/game.model';

@Injectable()
export class GameService {
  findAll(): Game[] {
    return db.games;
  }

  findById(id: string): Game {
    return db.games.find(g => g.id === id);
  }

  update(game: Game): Game {
    let idx = db.games.findIndex(g => g.id === game.id);
    if (idx === -1) {
      throw new NotFoundException('Game not found');
    }
    db.games[idx] = game;
    return db.games[idx];
  }
}
