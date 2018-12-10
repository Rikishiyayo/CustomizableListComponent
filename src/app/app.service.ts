import { Injectable } from '@angular/core';
import { players } from './players';
import { Player } from './models/player';
import { Subject } from 'rxjs';

const pageSize = 15;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Global observables of the component
  loadedPlayersChanged = new Subject<Player[]>();

  private players: Array<Player>;

  constructor() {
    this.players = players;
  }

  async getAllPlayersCount() {
    const allPlayers = await this.getAllPlayersPromise();
    return allPlayers.length;
  }

  async getAllPlayers() {
    const allPlayers = await this.getAllPlayersPromise();
    return allPlayers.slice();
  }

  async getPageOfPlayers(page: number): Promise<Player[]> {
    const allPlayers = await this.getAllPlayersPromise();
    return allPlayers.slice((page - 1) * pageSize, page * pageSize);
  }

  async loadPageOfPlayers(page: number) {
    console.log(`AppService - loadPageOfPlayers() invoked, getting ${page}.page
    of players and emitting an event`);
    const chunkOfPlayers = await this.getPageOfPlayers(page);
    this.loadedPlayersChanged.next(chunkOfPlayers);
  }

  // getPlayersWithAppliedFilter() {
  //   return this.players.slice(0, 100);
  // }

  private getAllPlayersPromise(): Promise<Player[]> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.players);
      }, 200);
    });
  }
}
