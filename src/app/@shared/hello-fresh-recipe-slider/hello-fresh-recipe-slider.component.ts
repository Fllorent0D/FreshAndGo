import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { Observable } from 'rxjs';
import { CarouselComponent, CarouselConfig } from 'ngx-bootstrap/carousel';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-hello-fresh-recipe-slider',
  templateUrl: './hello-fresh-recipe-slider.component.html',
  styleUrls: ['./hello-fresh-recipe-slider.component.scss'],
})
export class HelloFreshRecipeSliderComponent implements AfterViewInit {
  @Input() recipes$: Observable<Recipe[]>;
  @Output() recipeClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @ViewChild('carousel') carousel: NguCarousel<any>;
  @ViewChild('nextBtn') nextBtn: ElementRef;
  @ViewChild('previousBtn') previousBtn: ElementRef;

  carouselTile = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    slide: 3,
    speed: 400,
    animation: 'lazy',
    point: {
      visible: true,
    },
    load: 2,
    touch: true,
    easing: 'ease',
  };

  constructor() {}

  ngAfterViewInit(): void {
    this.carousel.nextBtn = this.nextBtn;
    this.carousel.prevBtn = this.previousBtn;
  }
}
