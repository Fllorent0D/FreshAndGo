import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  HelloFreshState,
  HelloFreshStateModel,
  RecipeCategory,
  RecipePage,
  RecipePagination,
} from '@core/store/recipe/hello-fresh.state';
import { Observable, of, Subscriber } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CuisineState, CuisineStateModel } from '@core/store/recipe/cuisines/cuisine.state';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { HelloFreshSearchState, HelloFreshSearchStateModel } from '@core/store/recipe/search/search.state';
import {
  HelloFreshSearchSuggestion,
  HelloFreshSearchSuggestionsResult,
  Recipe,
} from '@core/services/hello-fresh/hello-fresh.models';
import { SearchRecipe } from '@core/store/recipe/search/search.actions';
import { Router } from '@angular/router';
import { FetchRecipe, SaveRecipes } from '@core/store/recipe/hello-fresh.actions';
import { untilDestroyed } from '@core';

@Component({
  selector: 'app-search-recipe-page',
  templateUrl: './search-recipe-page.component.html',
  styleUrls: ['./search-recipe-page.component.scss'],
})
export class SearchRecipePageComponent implements OnInit, OnDestroy {
  @Select(CuisineState) cuisines$: Observable<CuisineStateModel>;
  @Select(HelloFreshSearchState) searchState$: Observable<HelloFreshSearchStateModel>;

  quickRecipes$: Observable<Recipe[]>;
  popularRecipes$: Observable<Recipe[]>;
  newRecipes$: Observable<Recipe[]>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const store$ = this.store.select(HelloFreshState).pipe(untilDestroyed(this));

    this.quickRecipes$ = store$.pipe(
      filter((state: HelloFreshStateModel) => !!state.pagination[RecipeCategory.QUICK]?.pages[0]),
      map((state: HelloFreshStateModel) => {
        const firstPage = state.pagination[RecipeCategory.QUICK].pages[0];
        return firstPage.items.map((id) => state.entities[id]).slice(0, 10);
      })
    );
    this.popularRecipes$ = store$.pipe(
      filter((state: HelloFreshStateModel) => !!state.pagination[RecipeCategory.POPULAR]?.pages[0]),
      map((state: HelloFreshStateModel) => {
        const firstPage = state.pagination[RecipeCategory.POPULAR].pages[0];
        return firstPage.items.map((id) => state.entities[id]).slice(0, 10);
      })
    );
    this.newRecipes$ = store$.pipe(
      filter((state: HelloFreshStateModel) => !!state.pagination[RecipeCategory.NEW]?.pages[0]),
      map((state: HelloFreshStateModel) => {
        const firstPage = state.pagination[RecipeCategory.NEW].pages[0];
        return firstPage.items.map((id) => state.entities[id]).slice(0, 10);
      })
    );
  }

  searchSelectedRecipe(result: Recipe) {
    this.store.dispatch(new SaveRecipes([result]));
    this.navigateToRecipe(result);
  }

  navigateToRecipe(recipe: Recipe) {
    this.router.navigate(['recettes', recipe.slug], { state: { data: { recipeId: recipe.id } } });
  }

  ngOnDestroy() {}
}
