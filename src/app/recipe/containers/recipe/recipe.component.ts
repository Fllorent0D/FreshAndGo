import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { HelloFreshState, HelloFreshStateModel } from '@core/store/recipe/hello-fresh.state';
import { HelloFreshSearchStateModel } from '@core/store/recipe/search/search.state';
import { SearchHelloFreshIngredient } from '@app/recipe/models/recipe.models';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ColruytSearchModalComponent } from '@app/colruyt-search/containers/colruyt-search-modal/colruyt-search-modal.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe$: Observable<Recipe>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private modalService: BsModalService) {
  }

  ngOnInit(): void {

    this.recipe$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const slug: string = params.get('recipe-slug');
        return this.store.select(HelloFreshState).pipe(
          map((helloFreshState: HelloFreshStateModel) => {
            for (const recipe of Object.values(helloFreshState.entities)) {
              if (recipe.slug === slug) {
                return recipe;
              }
            }
            throw new Error('Recipe not found');
          })
        );
      })
    );
  }

  searchIngredient(ingredientToSearch: SearchHelloFreshIngredient) {
    const modalRef = this.modalService.show(ColruytSearchModalComponent, { class: 'modal-lg' });
    modalRef.content.ingredient = ingredientToSearch.ingredient;
    modalRef.content.yield = ingredientToSearch.yieldReference;

  }
}
