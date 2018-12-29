import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RangeFilter } from 'src/app/models/listState';
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

  getFormControlNameForMin = () => 'min' + this.filterProperties.title;
  getFormControlNameForMax = () => 'max' + this.filterProperties.title;

  applyFilter = () => this.filterApplied.emit();
}
