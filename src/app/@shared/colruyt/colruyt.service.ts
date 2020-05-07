import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelloFreshListResponse, Recipe } from '@shared/hello-fresh/hello-fresh.models';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ColruytAddToBasketResponse,
  ColruytResponse,
  ColruytSearchItem,
  ColruytSearchResult,
  ColruytSearchResultResponse,
  ColruytUnit
} from '@shared/colruyt/colruyt.model';

@Injectable({
  providedIn: 'root'
})
export class ColruytService {

  private oAuth = 'a3b256fc3a7f0777ca101de0c54df4b5a95269b59ca2ce09d05c4079510fe5e15c1c68c712e70776b9c4a3138c71b490d23ba0014ebae96a22fc4ae8cb79e324';


  constructor(
    private httpClient: HttpClient
  ) {
  }

  searchProduct(query: string): Observable<ColruytSearchItem[]>{
    return this.httpClient.get<ColruytResponse<ColruytSearchResultResponse>>(environment.colruytGW + `/articles/search.json?q=${query}&oAuth=${this.oAuth}`).pipe(
      map((response: ColruytResponse<ColruytSearchResultResponse>) => response.data.searchResults[0].list)
    );
  }

  addToBasket(itemId: string, unit: ColruytUnit, quantity: number, comment?: string): Observable<ColruytAddToBasketResponse>{
    return this.httpClient.get<ColruytResponse<ColruytAddToBasketResponse>>(environment.colruytGW + `/basket/articles/add.json?id=${itemId}&weightCode=${unit}&quantity=${quantity}&comment=${comment}&oAuth=${this.oAuth}`).pipe(
      map((response: ColruytResponse<ColruytAddToBasketResponse>) => response.data)
    );
  }



}
