import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, Recipe } from '@shared/hello-fresh/hello-fresh.models';
import { ColruytService } from '@shared/colruyt/colruyt.service';
import { Subject } from 'rxjs';
import { ColruytSearchItem } from '@shared/colruyt/colruyt.model';
import { ColruytAddToBasketItem } from '@app/home/colruyt-search/colruyt-search-item/colruyt-search-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-colruyt-search',
  templateUrl: './colruyt-search.component.html',
  styleUrls: ['./colruyt-search.component.scss']
})
export class ColruytSearchComponent implements OnInit {


  @Input() set ingredient(ingredient: Ingredient) {
    this.searchProduct(ingredient.name);
    this.isLoading = true;
    this.colruytItems.next([]);
  };

  isLoading = false;
  @Input() activeRecipe: Recipe;


  colruytItems: Subject<ColruytSearchItem[]> = new Subject<ColruytSearchItem[]>();


  constructor(private colruytService: ColruytService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {


  }

  searchProduct(ingredientName: string) {
    this.colruytService.searchProduct(ingredientName).subscribe((list) => {
      this.colruytItems.next(list);
      this.isLoading = false;
    });
  }

  addToBasket(basketItem: ColruytAddToBasketItem) {

    this.colruytService.addToBasket(basketItem.item.id, basketItem.quantity.unit, basketItem.quantity.quantity, this.activeRecipe.name)
      .subscribe((response) => {
        this.toastr.success(`Prix ${response.lineTotalPrice}€`, 'Produit ajouté au panier!');
      }, (err) => {
        this.toastr.error('Erreur lors de l\'ajout!', 'Erreur');

      });
  }


}
