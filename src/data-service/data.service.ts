import { Injectable } from '@nestjs/common';
import { db } from '../data';

@Injectable()
export class DataService {
  deleteGame(id) {
    db.games = db.games.filter(g => g.id !== id);
  }
}
