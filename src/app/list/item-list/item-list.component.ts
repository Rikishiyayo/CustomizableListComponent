import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Player } from 'src/app/models/player';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Array<Player>;
  subscription: Subscription;

  constructor(private appService: AppService) {
    this.appService = appService;
  }

  async ngOnInit() {
    this.items = await this.appService.getPageOfPlayers(1);
    this.subscription = this.appService.loadedPlayersChanged
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
