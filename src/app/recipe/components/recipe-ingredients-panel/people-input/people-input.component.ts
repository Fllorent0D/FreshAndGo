import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-people-input',
  templateUrl: './people-input.component.html',
  styleUrls: ['./people-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PeopleInputComponent),
    multi: true
  }]
})
export class PeopleInputComponent implements ControlValueAccessor, OnInit {

  @Input() minimum = 1;
  @Input() maximum = 6;

  choices: number[] = [];
  value: number;

  constructor() {
  }

  ngOnInit() {
    // Generate list of choices
    this.choices = [...Array(this.maximum - this.minimum + 1).keys()].map((v) => v + this.minimum);
  }


  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  writeValue(state: any) {
    this.value = state.value;
  }

  peopleClicked(people: number) {
    if (this.value === people) {
      return;
    }

    this.value = people;
    this.onChange(people);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
