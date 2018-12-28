import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListStateService } from 'src/app/list-state.service';
import { AppService } from 'src/app/app.service';
import { FilterItem, FilterItemType, CheckBoxFilter, RangeFilter } from 'src/app/models/listState';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterFormSubscriptions: Subscription[] = [];
  filterForm: FormGroup;

  constructor(private appService: AppService,
    private listStateService: ListStateService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log('filterComponent - ngOnInit()');
    this.initForm();
  }

  private initForm() {
    const filterDefinition: Array<FilterItem> = this.appService.getFilterDefinition();
    this.filterForm = this.formBuilder.group(this.assembleForm(filterDefinition));
  }

  private assembleForm(filterDefinition: Array<FilterItem>): any {
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
            ['min' + rangeFilter.title]: [rangeFilter.minValue],
            ['max' + rangeFilter.title]: [rangeFilter.maxValue],
          });
          break;
      }
    }

    return formGroup;
  }

  applyFilter() {
    // select positions that were checked(true value in formArray)
    // let selectedPositions = this.filterForm.value.position
    //   .map((v, i) => v ? this.filter.filterItems.position.values[i] : null)
    //   .filter(v => v !== null);

    // // if no positions were selected, assign all positions to the variable in order to
    // // not filter by position
    // selectedPositions =
    //   (Array.isArray(selectedPositions) && selectedPositions.length)
    //     ? selectedPositions
    //     : this.filter.filterItems.position.values;

    // const filterValues = {
    //   position: selectedPositions,
    //   age: this.filterForm.value.age
    // };

    // console.log(`applying this filter: `, filterValues);
    // this.listStateService.updateAndApplyFilter(filterValues);
  }

  ngOnDestroy(): void {
    for (const subscription of this.filterFormSubscriptions) {
      subscription.unsubscribe();
    }
  }
}

// const checkboxFilter = filterItem as CheckBoxFilter;
          // formGroup[checkboxFilter.title] = this.formBuilder.array(
          //   checkboxFilter.values.map(() => this.formBuilder.control(false))
          // );

