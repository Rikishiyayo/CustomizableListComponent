import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from 'src/app/list/models/player';
import { Subscription } from 'rxjs';
import { ListStateService } from 'src/app/list/list-state.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Array<Player>;
  subscription: Subscription;

  constructor(private listStateService: ListStateService) {
    this.listStateService = listStateService;
  }

  async ngOnInit() {
    console.log('itemListComponent - ngOnInit()');
    this.items = await this.listStateService.getPageOfPlayers(1);
    this.subscription = this.listStateService.loadedItemsChanged
      .subscribe((items: Player[]) => {
        console.log(`ItemListComponent, OnInitloadedPlayersChanged subscriber invoked,
        setting displayed page of players`);
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
