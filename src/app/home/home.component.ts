import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { HelloFreshService } from '@shared/hello-fresh/hello-fresh.service';
import { HelloFreshListResponse, Ingredient, Recipe } from '@shared/hello-fresh/hello-fresh.models';
import { Observable, Subject } from 'rxjs';
import { ColruytAddToBasketItem } from '@app/home/colruyt-search/colruyt-search-item/colruyt-search-item.component';
import { ColruytService } from '@shared/colruyt/colruyt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  helloFreshRecipes$: Observable<Recipe[]>;
  activeRecipe$: Subject<Recipe> = new Subject<Recipe>();
  activeIngredients$: Subject<Ingredient> = new Subject<Ingredient>();


  constructor(
    private helloFreshService: HelloFreshService
  ) {
  }

  ngOnInit() {
    this.helloFreshRecipes$ = this.helloFreshService.fetchRecipes();
  }


}
