import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';
import { Player } from 'src/app/list/models/player';
import { Subscription } from 'rxjs';
import { ListStateService } from 'src/app/list/list-state.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  templateContext: {};
  items: Array<Player>;
  subscription: Subscription;
  @Input() itemListTemplate: TemplateRef<any>;

  constructor(private listStateService: ListStateService) {
    this.listStateService = listStateService;
  }

  async ngOnInit() {
    console.log('itemListComponent - ngOnInit()');

    this.items = await this.listStateService.getPageOfPlayers(1);
    this.subscription = this.listStateService.loadedItemsChanged
      .subscribe((items: Player[]) => {
        console.log(`ItemListComponent, loadedItemsChanged subscriber invoked,
        updating templateContext with items to display`);
        this.templateContext['$implicit'] = items;
      });

    this.templateContext = { $implicit: this.items };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
