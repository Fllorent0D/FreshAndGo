import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from '@core';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  HelloFreshState,
  HelloFreshStateModel,
  RecipeCategory,
  RecipeCategoryPages,
  RecipePagination,
} from '@core/store/recipe/hello-fresh.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { flatten } from 'lodash';
import { FetchRecipesForCategory } from '@core/store/recipe/hello-fresh.actions';
import { TAKE_RECIPE_COUNT } from '@core/services/hello-fresh/hello-fresh.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  recipes$: Observable<Recipe[]>;
  pageIsLoading$: Observable<boolean>;
  category$: Observable<RecipeCategoryPages>;
  totalItems$: Observable<number>;
  itemsPerPage = TAKE_RECIPE_COUNT;
  currentFilter$: Observable<{ category: RecipeCategory; page: number }>;

  recipes: Recipe[] = [];
  currentPage = 0;

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentFilter$ = this.activatedRoute.paramMap.pipe(
      untilDestroyed(this),
      map((params) => ({
        category: params.get('category-slug') as RecipeCategory,
        page: Number.parseInt(params.get('page'), 10) - 1,
      })),
      tap(({ category, page }) => this.store.dispatch(new FetchRecipesForCategory(category, page)))
    );

    this.recipes$ = this.currentFilter$.pipe(
      switchMap(({ category, page }) => {
        return this.store.select(HelloFreshState.getRecipesByCategoryPerPage(category, page));
      })
    );

    this.category$ = this.currentFilter$.pipe(
      switchMap(({ category }) => this.store.select(HelloFreshState.getRecipeCategory(category)))
    );

    this.pageIsLoading$ = this.currentFilter$.pipe(
      switchMap(({ category, page }) => this.store.select(HelloFreshState.getCategoryPage(category, page))),
      map((page) => page.isLoading)
    );

    this.totalItems$ = this.category$.pipe(
      map((category: RecipeCategoryPages) => (category.totalPages + 1) * TAKE_RECIPE_COUNT)
    );
  }

  ngOnDestroy(): void {}

  bottomReached() {}

  navigateToRecipe(recipe: Recipe) {
    this.router.navigate(['recettes', recipe.slug, recipe.id], { state: { data: { recipeId: recipe.id } } });
  }

  pageChanged(page: number) {
    const slug = this.activatedRoute.snapshot.params['category-slug'];

    this.router.navigate(['recettes', 'categorie', slug, page]);
  }
}
