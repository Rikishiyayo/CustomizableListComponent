import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterFormSubscriptions: Subscription[] = [];
  filterForm: FormGroup;

  filter = {
    filterItems: {
      position: {
        type: 'MultiCheckbox',
        title: 'Position',
        values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
        selectedValues: []
      },
      age: {
        type: 'MultiRange',
        title: 'Age',
        min: 16,
        max: 40
      }
    }
  };

  constructor(private appService: AppService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.initMultiCheckboxFilter();
    this.initRangeFilter();
  }

  private initMultiCheckboxFilter() {
    const controls = this.filter.filterItems.position.values
      .map(c => new FormControl(false));
    this.filterForm = this.formBuilder.group({
      position: this.formBuilder.array(controls),
      age: this.formBuilder.group({
        minAge: [16],
        maxAge: [40]
      })
    });

    this.filterFormSubscriptions
      .push(this.filterForm.get('position').valueChanges.subscribe(val => {
        this.applyFilter(this.filterForm);
      }));
  }

  private initRangeFilter() { }

  applyFilter(updatedFilterForm: FormGroup = null) {
    const filterForm = updatedFilterForm ? updatedFilterForm : this.filterForm;
    const selectedPositions = filterForm.value.position
      .map((v, i) => v ? this.filter.filterItems.position.values[i] : null)
      .filter(v => v !== null);

    const filterValues = {
      position: selectedPositions,
      age: filterForm.value.age
    };

    console.log(`applying this filter: `, filterValues);
    this.appService.loadFilteredPlayers(filterValues);
  }

  ngOnDestroy(): void {
    for (const subscription of this.filterFormSubscriptions) {
      subscription.unsubscribe();
    }
  }
}
