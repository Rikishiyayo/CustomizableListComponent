import { Injectable } from '@angular/core';
import { players } from './players';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private players: Array<Player>;

  constructor() {
    this.players = players;
  }

  getAllPlayers() {
    return this.players.slice(0, 15);
  }

  getPlayersWithAppliedFilter() {
    return this.players.slice(0, 100);
  }
}
