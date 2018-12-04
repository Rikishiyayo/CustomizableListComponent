import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ItemListComponent } from './list/item-list/item-list.component';
import { PositionPipe } from './position.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemListComponent,
    PositionPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
