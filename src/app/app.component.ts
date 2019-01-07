import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Player } from './list/models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // items: Player[];

  constructor (private appService: AppService) {
    this.appService = appService;
  }

  async ngOnInit() {
    // this.items = await this.appService.getPageOfPlayers(1);
  }
}
