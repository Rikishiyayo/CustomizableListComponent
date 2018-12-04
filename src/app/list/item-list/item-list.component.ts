import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Array<Player>;

  constructor(private appService: AppService) {
    this.appService = appService;
   }

  ngOnInit() {
    this.items = this.appService.getAllPlayers();
  }

}
