import { Component, Input, OnInit } from '@angular/core';
import { Cuisine } from '@core/services/hello-fresh/hello-fresh.models';

@Component({
  selector: 'app-cuisine-item',
  templateUrl: './cuisine-item.component.html',
  styleUrls: ['./cuisine-item.component.scss'],
})
export class CuisineItemComponent implements OnInit {
  @Input() cuisine: Cuisine;

  constructor() {}

  ngOnInit(): void {}
}
