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
    const controls = this.filter.filterItems.position.values
      .map(c => new FormControl(false));
    this.filterForm = this.formBuilder.group({
      position: this.formBuilder.array(controls),
      age: this.formBuilder.group({
        minAge: [this.filter.filterItems.age.min],
        maxAge: [this.filter.filterItems.age.max]
      })
    });
  }

  applyFilter() {
    // select positions that were checked(true value in formArray)
    let selectedPositions = this.filterForm.value.position
      .map((v, i) => v ? this.filter.filterItems.position.values[i] : null)
      .filter(v => v !== null);

    // if no positions were selected, assign all positions to the variable in order to
    // not filter by position
    selectedPositions =
      (Array.isArray(selectedPositions) && selectedPositions.length)
      ? selectedPositions
      : this.filter.filterItems.position.values;

    const filterValues = {
      position: selectedPositions,
      age: this.filterForm.value.age
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
