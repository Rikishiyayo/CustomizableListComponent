import { Injectable } from '@angular/core';
import { players } from './players';
import { Player } from './models/player';
import { Subject } from 'rxjs';
import { Filter } from './models/filter';

const pageSize = 15;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Global observables of the component
  loadedPlayersChanged = new Subject<Player[]>();
  playersFiltered = new Subject<number>();

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

  async getPageOfPlayers(page: number, listOfPlayers: Player[] = null): Promise<Player[]> {
    const allPlayers = listOfPlayers ? listOfPlayers : await this.getAllPlayersPromise();
    return allPlayers.slice((page - 1) * pageSize, page * pageSize);
  }

  async getFilteredListOfPlayers(filter: Filter): Promise<Player[]> {
    const allPlayers = await this.getAllPlayersPromise();

    const filteredPlayers = allPlayers.filter((value) =>
      this.meetsFilterCriteria(value, filter));

    return filteredPlayers;
  }

  private meetsFilterCriteria(player: Player, filter: Filter): boolean {
    return filter.position.includes(player.position)
      && player.age >= filter.age.minAge
      && player.age <= filter.age.maxAge;
  }

  // Event emmiting methods
  async loadPageOfPlayers(page: number) {
    console.log(`AppService - loadPageOfPlayers() invoked, getting ${page}.page
    of players and emitting an event`);
    const chunkOfPlayers = await this.getPageOfPlayers(page);
    this.loadedPlayersChanged.next(chunkOfPlayers);
  }

  async loadFilteredPlayers(filter: Filter) {
    console.log(`AppService - loadFilteredPlayers() invoked, getting
    of filtered players and emitting an event`);

    const filteredListOfPlayers = await this.getFilteredListOfPlayers(filter);
    const pageOfFilteredListOfPlayers = await this.getPageOfPlayers(1, filteredListOfPlayers);

    this.loadedPlayersChanged.next(pageOfFilteredListOfPlayers);
    this.playersFiltered.next(filteredListOfPlayers.length);
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
