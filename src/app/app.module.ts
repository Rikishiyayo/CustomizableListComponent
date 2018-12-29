import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ItemListComponent } from './list/item-list/item-list.component';
import { PositionPipe } from './position.pipe';
import { PagingComponent } from './list/paging/paging.component';
import { FilterComponent } from './list/filter/filter.component';
import { CheckboxFilterComponent } from './list/filter/filterItems/checkbox-filter/checkbox-filter.component';
import { RangeFilterComponent } from './list/filter/filterItems/range-filter/range-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemListComponent,
    PositionPipe,
    PagingComponent,
    FilterComponent,
    CheckboxFilterComponent,
    RangeFilterComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
