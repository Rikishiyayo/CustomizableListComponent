import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckBoxFilter } from 'src/app/models/listState';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.css']
})
export class CheckboxFilterComponent implements OnInit {

  @Output() filterApplied = new EventEmitter();
  @Input() formGroup: FormGroup;
  @Input() filterProperties: CheckBoxFilter;

  constructor() { }

  ngOnInit() {
  }

  applyFilter = () => this.filterApplied.emit();
}
