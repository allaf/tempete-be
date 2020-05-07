import { Injectable } from '@nestjs/common';
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
}
