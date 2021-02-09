import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  multicast,
  publish,
  publishReplay,
  refCount,
  share,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Action, Actions, ofActionCompleted, ofActionDispatched, ofActionSuccessful, Store } from '@ngxs/store';
import { HelloFreshState, HelloFreshStateModel } from '@core/store/recipe/hello-fresh.state';
import { HelloFreshSearchStateModel } from '@core/store/recipe/search/search.state';
import { SearchHelloFreshIngredient } from '@app/recipe/models/recipe.models';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ColruytSearchModalComponent } from '@app/colruyt-search/containers/colruyt-search-modal/colruyt-search-modal.component';
import { untilDestroyed } from '@core';
import { FetchRecipe, SaveRecipes } from '@core/store/recipe/hello-fresh.actions';
import { ActionContext } from '@ngxs/store/src/actions-stream';
import { FavoritesState } from '@core/store/recipe/favorites/favorites.state';
import { ToggleRecipeFromFavorite } from '@core/store/recipe/favorites/favorite.actions';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe$: Observable<Recipe>;
  params$: Observable<Params>;
  isFavorite$: Observable<boolean>;

  @ViewChild('recipe') recipeContainer: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.params$ = this.activatedRoute.params;

    this.recipe$ = this.params$.pipe(
      untilDestroyed(this),
      map((params) => params.id),
      switchMap((id: string) =>
        this.store
          .dispatch(new FetchRecipe(id))
          .pipe(mergeMap(() => this.store.select(HelloFreshState.getRecipeById(id))))
      ),
      shareReplay(1)
    );

    this.isFavorite$ = this.recipe$.pipe(
      untilDestroyed(this),
      switchMap((recipe) => this.store.select(FavoritesState.isRecipeInFavorites(recipe.id)))
    );
  }

  searchIngredient(ingredientToSearch: SearchHelloFreshIngredient) {
    const modalRef = this.modalService.show(ColruytSearchModalComponent, { class: 'modal-lg' });
    modalRef.content.ingredient = ingredientToSearch.ingredient;
    modalRef.content.yield = ingredientToSearch.yieldReference;
  }

  ngOnDestroy(): void {}

  toggleFavorite(recipe: Recipe) {
    this.store.dispatch(new ToggleRecipeFromFavorite(recipe));
  }

  async downloadRecipe() {
    const node = document.getElementById('my-node');

    try {
      const dataUrl = await domtoimage.toJpeg(node);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'Image.png';
      a.click();
    } catch (err) {
      console.error('ERR', err.message);
    }
  }
}
