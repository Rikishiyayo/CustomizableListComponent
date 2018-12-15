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

  positionFilterItem = {
    title: 'Position',
    values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
  };
  ageFilterItem = {
    title: 'Age', min: 16, max: 40
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
    const controls = this.positionFilterItem.values
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
        console.log(`position: ${val}`);
      }));
  }

  private initRangeFilter() {  }

  rangeFilterValueChanged(minValue, maxValue) {
    console.log(`age: ${minValue} - ${maxValue}`);
  }

  onSubmit() {
    console.log(this.filterForm.value.position);

    this.appService.loadFilteredPlayers('');
    const selectedPositions = this.filterForm.value.position
      .map((v, i) => v ? this.positionFilterItem.values[i] : null)
      .filter(v => v !== null);

    console.log(selectedPositions);
  }

  ngOnDestroy(): void {
    for (const subscription of this.filterFormSubscriptions) {
      subscription.unsubscribe();
    }
  }
}
