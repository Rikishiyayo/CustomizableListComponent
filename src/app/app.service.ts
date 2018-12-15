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

  // Event emmiting methods
  async loadPageOfPlayers(page: number) {
    console.log(`AppService - loadPageOfPlayers() invoked, getting ${page}.page
    of players and emitting an event`);
    const chunkOfPlayers = await this.getPageOfPlayers(page);
    this.loadedPlayersChanged.next(chunkOfPlayers);
  }

  async loadFilteredPlayers(filter: string) {
    console.log(`AppService - loadFilteredPlayers() invoked, getting
    of filtered players and emitting an event`);
    const chunkOfPlayers = await this.getPageOfPlayers(1);
    this.loadedPlayersChanged.next(chunkOfPlayers);
  }

  // private helper methods
  private getAllPlayersPromise(): Promise<Player[]> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.players);
      }, 200);
    });
  }
}
