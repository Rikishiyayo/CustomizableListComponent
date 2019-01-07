import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() itemListTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    console.log('listComponent - ngOnInit()');
  }

}
