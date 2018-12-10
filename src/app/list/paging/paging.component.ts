import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

enum PagingControls {
  First = 'f',
  Previous = 'p',
  Next = 'n',
  Last = 'l',
}
const pageSize = 15;

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  currentPage = 1;
  totalPages: number;

  constructor(private appService: AppService) {
    this.appService = appService;
  }

  async ngOnInit() {
    const allPlayersCount = await this.appService.getAllPlayersCount();
    const temp = allPlayersCount % pageSize;
    this.totalPages = temp === 0 ? allPlayersCount / pageSize : allPlayersCount / pageSize + 1;
  }

  changePage = (pagingControlSelected: string) => this.updateListComponent(pagingControlSelected);

  private updateListComponent(pagingControlSelected: string) {
    switch (pagingControlSelected.toLowerCase()) {
      case PagingControls.First:
        this.currentPage = 1;
        break;
      case PagingControls.Previous:
        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
        break;
      case PagingControls.Next:
        this.currentPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages;
        break;
      case PagingControls.Last:
        this.currentPage = this.totalPages;
        break;
    }
    console.log(`PagingComponent - loading ${this.currentPage}.page of players`);
    this.appService.loadPageOfPlayers(this.currentPage);
  }
}
