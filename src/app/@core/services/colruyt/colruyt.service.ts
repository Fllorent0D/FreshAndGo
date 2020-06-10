import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelloFreshListResponse, Recipe } from '@core/services/hello-fresh/hello-fresh.models';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  ColruytAddToBasketResponse,
  ColruytOAuth,
  ColruytResponse,
  ColruytSearchItem,
  ColruytSearchResult,
  ColruytSearchResultResponse,
  ColruytShowBasket,
  ColruytUnit,
} from '@core/services/colruyt/colruyt.model';
import { StateContext } from '@ngxs/store';
import { ColruytStateModel } from '@core/store/colruyt/colruyt.state';
import { ColruytLogin } from '@core/store/colruyt/colruyt.action';

@Injectable({
  providedIn: 'root',
})
export class ColruytService {
  private oAuth =
    'a3b256fc3a7f0777ca101de0c54df4b5a95269b59ca2ce09d05c4079510fe5e15c1c68c712e70776a9228c02126bd62f370f9e14a0c2df4b478f8a90b310a2c9';

  constructor(private httpClient: HttpClient) {}

  searchProduct(query: string): Observable<ColruytSearchItem[]> {
    return this.httpClient
      .get<ColruytResponse<ColruytSearchResultResponse>>(environment.colruytGW + `/articles/search.json?q=${query}`)
      .pipe(map((response: ColruytResponse<ColruytSearchResultResponse>) => response.data.searchResults[0].list));
  }

  addToBasket(
    itemId: string,
    unit: ColruytUnit,
    quantity: number,
    comment?: string
  ): Observable<ColruytAddToBasketResponse> {
    return this.httpClient
      .get<ColruytResponse<ColruytAddToBasketResponse>>(
        environment.colruytGW + `/basket/articles/add.json?id=${itemId}&weightCode=${unit}&quantity=${quantity}`
      )
      .pipe(map((response: ColruytResponse<ColruytAddToBasketResponse>) => response.data));
  }

  fetchBasket(): Observable<ColruytShowBasket> {
    return this.httpClient.get<ColruytResponse<ColruytShowBasket>>(environment.colruytGW + `/basket/show.json?`).pipe(
      map((response: ColruytResponse<ColruytShowBasket>) => {
        if (response.status.code === 0) {
          return response.data;
        }
        throwError(new Error(response.status.meaning));
      })
    );
  }

  clearBasket(): Observable<ColruytShowBasket> {
    return this.httpClient.get<ColruytResponse<ColruytShowBasket>>(environment.colruytGW + `/basket/clear.json?`).pipe(
      map((response: ColruytResponse<ColruytShowBasket>) => {
        if (response.status.code === 0) {
          return response.data;
        }
        throwError(new Error(response.status.meaning));
      })
    );
  }

  login(login: ColruytLogin): Observable<ColruytOAuth> {
    return this.httpClient
      .get<ColruytResponse<ColruytOAuth>>(
        environment.colruytGW + `/users/authenticate.json?logon_id=${login.username}&password=${login.password}`
      )
      .pipe(
        map((response: ColruytResponse<ColruytOAuth>) => {
          if (response.status.code === 0) {
            return response.data;
          }
          throwError(new Error(response.status.meaning));
        })
      );
  }

  logout(): Observable<null> {
    return this.httpClient.get<ColruytResponse<null>>(environment.colruytGW + `/log_off.json?`).pipe(
      map((response: ColruytResponse<null>) => {
        if (response.status.code === 0) {
          return response.data;
        }
        throwError(new Error(response.status.meaning));
      })
    );
  }
}
