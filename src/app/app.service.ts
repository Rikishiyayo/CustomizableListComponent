import { Injectable } from '@angular/core';
import { players } from './players';
import { Player } from './models/player';
import { Filter } from './models/filter';
import { FilterItem } from './models/listState';

const pageSize = 15;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private players: Array<Player>;

  constructor() {
    this.players = players;
  }

  getFilterDefinition(): Array<FilterItem> {
    const filters = [
      {
        type: 0,
        title: 'position',
        values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
        selectedValues: []
      },
      {
        type: 2,
        title: 'age',
        minValue: 16,
        maxValue: 40,
        selectedMinValue: undefined,
        selectedMaxValue: undefined
      }
    ];

    return filters;
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
      && player.age >= filter.age.minage
      && player.age <= filter.age.maxage;
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
