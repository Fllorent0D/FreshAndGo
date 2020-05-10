import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ColruytAddToBasketItem } from '@app/home/colruyt-search/colruyt-search-item/colruyt-search-item.component';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ColruytSearchItem } from '@core/services/colruyt/colruyt.model';
import { Ingredient, Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { ColruytService } from '@core/services/colruyt/colruyt.service';

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
    this.ngxService.start('loader-1');
  }

  isLoading = false;
  @Input() activeRecipe: Recipe;

  colruytItems: Subject<ColruytSearchItem[]> = new Subject<ColruytSearchItem[]>();

  constructor(
    private colruytService: ColruytService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
  }

  searchProduct(ingredientName: string) {
    this.colruytService.searchProduct(ingredientName).subscribe((list) => {
      this.colruytItems.next(list);
      this.ngxService.stop('loader-1');
      this.isLoading = false;
    });
  }

  addToBasket(basketItem: ColruytAddToBasketItem) {
    this.colruytService
      .addToBasket(basketItem.item.id, basketItem.quantity.unit, basketItem.quantity.quantity)
      .subscribe(
        (response) => {
          this.toastr.success(`Prix ${response.lineTotalPrice}€`, basketItem.item.description + ' ajouté au panier!');
          this.bsModalRef.hide();
        },
        (err) => {
          this.toastr.error('Erreur lors de l\'ajout!', 'Erreur');
        }
      );
  }
}
