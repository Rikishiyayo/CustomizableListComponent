import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { Player } from './models/player';
import { Filter } from './models/filter';

@Injectable({
  providedIn: 'root'
})
export class ListStateService {

  loadedItemsChanged = new Subject<Player[]>();
  itemsFiltered = new Subject<number>();

  private items: Array<Player>;
  private filter: Filter;

  constructor(private appService: AppService) {
    this.initListState();
  }

  async getAllPlayersCount() {
    return await this.appService.getAllPlayersCount();
  }

  async updateAndApplyFilter(filter: any) {
    this.filter = filter;
    await this.getFilteredListOfItems();

    this.loadedItemsChanged.next(this.items);
    this.itemsFiltered.next(100); // this info must come from webApi call
  }

  async ApplyPage(page: number) {
    this.items = await this.getPageOfPlayers(page);

    this.loadedItemsChanged.next(this.items);
  }

  private async getFilteredListOfItems() {
    // proly does not conform with single responsibility principle
    // this method should get the data and not update state, move state updating to
    // applyFilter method or a different method
    console.log(`FilterStateService - getFilteredListOfItems() invoked, getting
      filtered players and emitting an event`);

    const filteredListOfItems = await this.appService.getFilteredListOfPlayers(this.filter);
    this.items = await this.getPageOfPlayers(1, filteredListOfItems);
  }

  async getPageOfPlayers(page: number, items: Array<Player> = null): Promise<Array<Player>> {
    return this.appService.getPageOfPlayers(page, items);
  }

  private async initListState() {
    this.items = await this.appService.getPageOfPlayers(1);
  }
}
