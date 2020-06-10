import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {
  HelloFreshSearchSuggestion,
  HelloFreshSearchSuggestionsResult,
  Recipe,
} from '@core/services/hello-fresh/hello-fresh.models';
import { Select, Store } from '@ngxs/store';
import { HelloFreshSearchState, HelloFreshSearchStateModel } from '@core/store/recipe/search/search.state';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchRecipe } from '@core/store/recipe/search/search.actions';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-search-recipe-input',
  templateUrl: './search-recipe-input.component.html',
  styleUrls: ['./search-recipe-input.component.scss'],
})
export class SearchRecipeInputComponent implements OnInit {
  @Input() searchState: HelloFreshSearchStateModel;
  @Output() searchResultSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  suggestions$: Observable<Recipe[]>;
  input: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Subscriber<string>) => {
      // Runs on every search
      observer.next(this.input);
    }).pipe(
      switchMap((search: string) => this.store.dispatch(new SearchRecipe(search))),
      map(() => this.searchState),
      map((results) => results.results),
      tap((state) => console.log(state))
    );
  }

  onSelect(resultSelected: TypeaheadMatch) {
    this.searchResultSelected.emit(resultSelected.item as Recipe);
  }
}
