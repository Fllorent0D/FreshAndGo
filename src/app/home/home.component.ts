import { Component, OnInit } from '@angular/core';
import { HelloFreshService } from '@shared/hello-fresh/hello-fresh.service';
import { HelloFreshListResponse, Ingredient, Recipe } from '@shared/hello-fresh/hello-fresh.models';
import { Observable, Subject } from 'rxjs';
import { ColruytSearchComponent } from '@app/home/colruyt-search/colruyt-search.component';
import { BsModalService } from 'ngx-bootstrap/modal';

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
    private helloFreshService: HelloFreshService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.helloFreshRecipes$ = this.helloFreshService.fetchRecipes();

  }

  openSearch(ingredient: Ingredient) {
    const modalRef = this.modalService.show(ColruytSearchComponent, { class: 'modal-lg' });
    modalRef.content.ingredient = ingredient;
  }


}
