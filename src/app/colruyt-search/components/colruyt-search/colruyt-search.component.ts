import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ColruytAddToBasketItem } from '@app/colruyt-search/components/colruyt-search-item/colruyt-search-item.component';
import { ColruytSearchItem } from '@core/services/colruyt/colruyt.model';
import { Ingredient } from '@core/services/hello-fresh/hello-fresh.models';
import { ColruytService } from '@core/services/colruyt/colruyt.service';
import { Store } from '@ngxs/store';
import { ColruytAddToBasket } from '@core/store/colruyt/basket/basket.action';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { untilDestroyed } from '@core';

@Component({
  selector: 'app-colruyt-search',
  templateUrl: './colruyt-search.component.html',
  styleUrls: ['./colruyt-search.component.scss'],
})
export class ColruytSearchComponent implements OnInit, OnDestroy {
  @Input() set ingredient(ingredient: Ingredient) {
    this.searchProduct(ingredient.name);
    this.searchInput.setValue(ingredient.name);
  }

  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  isLoading = false;
  colruytItems: Subject<ColruytSearchItem[]> = new Subject<ColruytSearchItem[]>();
  searchInput: FormControl = new FormControl('');

  constructor(private colruytService: ColruytService, private store: Store) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        filter((val) => !!val.trim()),
        debounceTime(300),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        this.searchProduct(value);
      });
  }

  searchProduct(ingredientName: string) {
    this.isLoading = true;
    this.colruytItems.next([]);
    this.colruytService.searchProduct(ingredientName).subscribe((list) => {
      this.colruytItems.next(list);
      this.isLoading = false;
    });
  }

  addToBasket(basketItem: ColruytAddToBasketItem) {
    this.store
      .dispatch(new ColruytAddToBasket(basketItem.item, basketItem.quantity.unit, basketItem.quantity.quantity))
      .subscribe(() => this.productAdded.emit());
  }
}
