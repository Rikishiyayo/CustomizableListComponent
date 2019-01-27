import { Injectable } from '@angular/core';
import { players } from './players';
import { Player } from './list/models/player';
import { FilterItem } from './list/models/listState';

const pageSize = 15;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private players: Player[];

  constructor() {
    this.players = players;
  }

  public getFilterDefinition(): FilterItem[] {
    const filters = [
      {
        type: 0,
        title: 'position',
        values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
        selectedValues: []
      },
      {
        type: 3,
        title: 'age',
        minValue: 16,
        maxValue: 40
      }
    ];

    return filters;
  }

  public async getAllPlayersCount() {
    const allPlayers = await this.getAllPlayersPromise();
    return allPlayers.length;
  }

  public async getAllPlayers() {
    const allPlayers = await this.getAllPlayersPromise();
    return allPlayers.slice();
  }

  public async getPageOfPlayers(page: number, listOfPlayers: Player[] = null): Promise<Player[]> {
    const allPlayers = listOfPlayers ? listOfPlayers : await this.getAllPlayersPromise();
    return allPlayers.slice((page - 1) * pageSize, page * pageSize);
  }

  public async getFilteredListOfPlayers(filter: any): Promise<Player[]> {
    const allPlayers = await this.getAllPlayersPromise();

    const filteredPlayers = allPlayers.filter((value) =>
      this.meetsFilterCriteria(value, filter));

    return filteredPlayers;
  }

  private meetsFilterCriteria(player: Player, filter: any[]): boolean {
    const pos = filter[0].position;
    const age = filter[1].age;
    return filter[0].position.includes(player.position)
      && player.age >= filter[1].age.min
      && player.age <= filter[1].age.max;
  }

  private getAllPlayersPromise(): Promise<Player[]> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.players);
      }, 200);
    });
  }
}
