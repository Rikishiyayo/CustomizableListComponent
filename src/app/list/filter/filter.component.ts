import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ListStateService } from 'src/app/list/list-state.service';
import { AppService } from 'src/app/app.service';
import { FilterItemType, CheckBoxFilter, RangeFilter, FilterItem } from 'src/app/list/models/listState';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  filterDefinition: FilterItem[];

  constructor(private appService: AppService,
    private listStateService: ListStateService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log('filterComponent - ngOnInit()');
    this.initForm();
  }

  initForm(): void {
    this.filterDefinition = this.appService.getFilterDefinition();
    this.filterForm = this.formBuilder.group(this.assembleForm(this.filterDefinition));
    this.listStateService.initFilter(this.getFilterValues());
  }

  assembleForm(filterDefinition: FilterItem[]): any {
    console.log('filterComponent - assembleForm()');
    const formGroup = {};

    for (const filterItem of filterDefinition) {
      switch (filterItem.type) {
        case FilterItemType.checkbox:
        case FilterItemType.dropdown:
        case FilterItemType.radio:
          const checkboxFilter = filterItem as CheckBoxFilter;
          const filterItemOptions = {};
          checkboxFilter.values.forEach(value => {
            filterItemOptions[value] = this.formBuilder.control(false);
          });
          formGroup[checkboxFilter.title] = this.formBuilder.group(filterItemOptions);
          break;
        case FilterItemType.range:
          const rangeFilter = filterItem as RangeFilter;
          formGroup[rangeFilter.title] = this.formBuilder.group({
            'min': [rangeFilter.minValue],
            'max': [rangeFilter.maxValue],
          });
          break;
      }
    }

    return formGroup;
  }

  applyFilter(): void {
    const filter = this.getFilterValues();
    console.log(`filterComponent - applyFilter(): applying this filter: `, filter);
    this.listStateService.updateAndApplyFilter(filter);
  }

  getFilterValues(): any[] {
    const getFilterValuesBasedOnFilterType = {
      [FilterItemType.checkbox]: this.getCheckboxFilterValue,
      [FilterItemType.radio]: this.getCheckboxFilterValue,
      [FilterItemType.dropdown]: this.getCheckboxFilterValue,
      [FilterItemType.range]: this.getRangeFilterValue
    };
    const filterValues = [];

    for (const [filterName, filterValue] of Object.entries(this.filterForm.value)) {
      // get type of filter
      const filterType = this.filterDefinition
        .find((value: FilterItem) => value.title === filterName).type;

      // get filterValue based on filter type
      const funcToGetFilterValues = getFilterValuesBasedOnFilterType[filterType];
      filterValues.push({ [filterName]: funcToGetFilterValues(filterValue) });
    }

    return filterValues;
  }

  getRangeFilterValue(rangeFilterValue): { min: number, max: number } {
    return { min: rangeFilterValue.min, max: rangeFilterValue.max };
  }

  getCheckboxFilterValue(checkboxFilterValue): string[] {
    // select positions that were checked(value[0] is position,
    // value[1] is boolean[true if checkbox was checked, false if it was not)]
    let selectedCheckboxValues = Object.entries(checkboxFilterValue)
      .map(value => value[1] ? value[0] : null).filter(value => value);

    // if no positions were selected, assign all positions to the variable in order to
    // not filter by position
    selectedCheckboxValues = (Array.isArray(selectedCheckboxValues) && selectedCheckboxValues.length)
      ? selectedCheckboxValues
      : Object.entries(checkboxFilterValue).map(value => value[0]);

    return selectedCheckboxValues;
  }

  //////////////////////////////////////////////////////////
  dumpFormValue = () => console.log(this.filterForm.value);
  dumpForm = () => console.log(this.filterForm);
  //////////////////////////////////////////////////////////
}


