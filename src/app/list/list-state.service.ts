import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class ListStateService {

  loadedItemsChanged = new Subject<Player[]>();
  itemsFiltered = new Subject<number>();

  private items: Array<Player>;
  private filter: any;
  private totalFilteredItems: number;
  private currentPage: number;

  constructor(private appService: AppService) {
    this.initListState();
  }

  public async getPageOfPlayers(page: number, items: Array<Player> = null): Promise<Array<Player>> {
    return this.appService.getPageOfPlayers(page, items);
  }

  public async getAllPlayersCount(): Promise<number> {
    return await this.appService.getAllPlayersCount();
  }

  public async updateAndApplyFilter(filter: any) {
    console.log('ListStateService - updateAndApplyFilter()');

    this.filter = filter;
    this.currentPage = 1;
    await this.getFilteredListOfItems();

    this.loadedItemsChanged.next(this.items);
    this.itemsFiltered.next(this.totalFilteredItems); // this info must come from webApi call
  }

  public async applyPage(page: number) {
    console.log('ListStateService - applyPage()');

    this.currentPage = page;
    await this.getFilteredListOfItems();

    this.loadedItemsChanged.next(this.items);
  }

  public initFilter = (filter: any) => this.filter = filter;

  private async initListState() {
    this.items = await this.appService.getPageOfPlayers(1);
  }

  private async getFilteredListOfItems() {
    // proly does not conform with single responsibility principle
    // this method should get the data and not update state, move state updating to
    // applyFilter method or a different method
    console.log(`ListStateService - getFilteredListOfItems() invoked, getting
      filtered players and emitting an event`);

    const filteredListOfItems = await this.appService.getFilteredListOfPlayers(this.filter);

    this.totalFilteredItems = filteredListOfItems.length;
    this.items = await this.getPageOfPlayers(this.currentPage, filteredListOfItems);
  }
}
