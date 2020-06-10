import { Component, Input, OnInit } from '@angular/core';
import { Cuisine } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.scss'],
})
export class CuisineListComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() isSuccess: boolean;
  @Input() isFailure: boolean;
  @Input() cuisines: Cuisine[];

  constructor() {}

  ngOnInit(): void {}
}
