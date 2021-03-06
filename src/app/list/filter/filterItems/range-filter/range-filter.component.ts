import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RangeFilter } from 'src/app/list/models/listState';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent implements OnInit {

  @Output() filterApplied = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() filterProperties: RangeFilter;

  constructor() { }

  ngOnInit() {
  }

  applyFilter = () => this.filterApplied.emit();
}
