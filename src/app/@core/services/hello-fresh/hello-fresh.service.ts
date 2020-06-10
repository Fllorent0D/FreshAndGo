import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import {
  Cuisine,
  HelloFreshListResponse,
  HelloFreshSearchSuggestionsResult,
  Recipe,
  WeeklyMenu,
} from '@core/services/hello-fresh/hello-fresh.models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HelloFreshService {
  constructor(private httpClient: HttpClient) {}

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(environment.helloFreshGW + '/recipes?country=be&skip=40&locale=fr-BE')
      .pipe(map((response: HelloFreshListResponse<Recipe>) => response.items));
  }

  fetchWeeklyRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<HelloFreshListResponse<WeeklyMenu>>(
        environment.helloFreshGW +
          '/menus?include=steps,ingredients&country=be&locale=fr-BE&product=classic-box&week=2020-W21'
      )
      .pipe(
        map((response: HelloFreshListResponse<WeeklyMenu>) => {
          return response.items.reduce<Recipe[]>((acc, weekMenu) => {
            acc.push(...weekMenu.courses.map((course) => course.recipe));
            return acc;
          }, []);
        })
      );
  }

  fetchRecipe(recipeId: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(environment.helloFreshGW + '/recipes/' + recipeId + '?country=be&locale=fr-BE');
  }

  fetchToken(): Observable<string> {
    return this.httpClient
      .get(environment.helloFreshFE, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          const regex = /accessToken":"(\S+)",/gm;
          const match = regex.exec(response.body);
          return match[1];
        })
      );
  }

  fetchCuisines(): Observable<Cuisine[]> {
    return this.httpClient
      .get<HelloFreshListResponse<Cuisine>>(environment.helloFreshGW + '/cuisines')
      .pipe(map((response) => response.items));
  }

  searchSuggestions(term: string): Observable<HelloFreshSearchSuggestionsResult[]> {
    return this.httpClient
      .get<HelloFreshListResponse<HelloFreshSearchSuggestionsResult>>(
        environment.helloFreshGW + '/recipes/search/suggestions?q=' + term + '&locale=fr-BE&country=be'
      )
      .pipe(map((res: HelloFreshListResponse<HelloFreshSearchSuggestionsResult>) => res.items));
  }

  searchRecipes(term: string): Observable<Recipe[]> {
    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(
        environment.helloFreshGW + '/recipes/search?q=' + term + '&locale=fr-BE&country=be'
      )
      .pipe(map((res: HelloFreshListResponse<Recipe>) => res.items));
  }

  searchQuickRecipe(page: number = 0, limit: number = 20): Observable<Recipe[]> {
    const offset = limit * page;

    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(
        environment.helloFreshGW +
          `recipes/search?offset=${offset}&limit=${limit}&order=-date&locale=fr-BE&country=be&max-prep-time=25&product=classic-box|veggie-box|family-box`
      )
      .pipe(map((res: HelloFreshListResponse<Recipe>) => res.items));
  }

  searchPopularRecipes(page: number = 0, limit: number = 20): Observable<Recipe[]> {
    const offset = limit * page;

    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(
        environment.helloFreshGW +
          `recipes/search?offset=${offset}&limit=${limit}&order=-favorites&locale=fr-BE&country=be`
      )
      .pipe(map((res: HelloFreshListResponse<Recipe>) => res.items));
  }

  searchNewRecipes(page: number = 0, limit: number = 20): Observable<Recipe[]> {
    const offset = limit * page;

    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(
        environment.helloFreshGW + `recipes/search?offset=${offset}&limit=${limit}&order=-date&locale=fr-BE&country=be`
      )
      .pipe(map((res: HelloFreshListResponse<Recipe>) => res.items));
  }
}
