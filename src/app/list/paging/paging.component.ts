import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

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
export class PagingComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  currentPage = 1;
  totalPages: number;

  constructor(private appService: AppService) {
    this.appService = appService;
  }

  async ngOnInit() {
    const allPlayersCount = await this.appService.getAllPlayersCount();
    this.totalPages = this.numberOfPages(allPlayersCount);

    this.subscription = this.appService.playersFiltered
      .subscribe((total: number) => this.totalPages = this.numberOfPages(total));
  }

  private numberOfPages(itemsCount: number) {
    const temp = itemsCount % pageSize;
    return temp === 0 ? itemsCount / pageSize : Math.floor(itemsCount / pageSize) + 1;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
