import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { HelloFreshListResponse, Recipe, WeeklyMenu } from '@core/services/hello-fresh/hello-fresh.models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelloFreshService {
  constructor(private httpClient: HttpClient) {
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<HelloFreshListResponse<Recipe>>(
        environment.helloFreshGW + '/recipes/recipes?country=be&skip=40&locale=fr-BE'
      )
      .pipe(map((response: HelloFreshListResponse<Recipe>) => response.items));
  }

  fetchWeeklyRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<HelloFreshListResponse<WeeklyMenu>>(
        environment.helloFreshGW + '/menus-service/menus?include=steps,ingredients&country=be&locale=fr-BE&product=classic-box&week=2020-W21'
      ).pipe(
        map((response: HelloFreshListResponse<WeeklyMenu>) => {
          return response.items.reduce<Recipe[]>((acc, weekMenu) => {
            acc.push(...weekMenu.courses.map((course) => course.recipe));
            return acc;
          }, []);
        })
      );
  }

  fetchRecipe(recipeId: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(environment.helloFreshGW + '/recipes/recipes/' + recipeId + '?exclude=steps&country=be&locale=fr-BE')
  }


  fetchToken(): Observable<string> {
    return this.httpClient
      .get(environment.helloFreshFE, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        map((response) => {
          const regex = /accessToken":"(\S+)",/gm;
          const match = regex.exec(response.body);
          return match[1];
        })
      );
  }
}
