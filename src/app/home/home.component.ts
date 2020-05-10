import { Component, OnInit } from '@angular/core';
import { Ingredient, Recipe } from '@shared/../@core/services/hello-fresh/hello-fresh.models';
import { Observable, Subject } from 'rxjs';
import { ColruytSearchComponent } from '@app/home/colruyt-search/colruyt-search.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Select, Store } from '@ngxs/store';
import { HelloFreshState } from '@core/store/recipe/hello-fresh.state';
import { FetchRecipesHelloFresh, SetActiveRecipe } from '@core/store/recipe/hello-fresh.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Select(HelloFreshState.recipes) recipes$: Observable<Recipe[]>;
  @Select(HelloFreshState.activeRecipe) activeRecipe$: Observable<Recipe>;

  constructor(private modalService: BsModalService, private store: Store) {}

  setActiveRecipe(recipe: Recipe) {
    this.store.dispatch(new SetActiveRecipe(recipe));
  }

  openSearch(ingredient: Ingredient) {
    const modalRef = this.modalService.show(ColruytSearchComponent, { class: 'modal-lg' });
    modalRef.content.ingredient = ingredient;
  }
}
