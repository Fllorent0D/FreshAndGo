import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { HelloFreshListResponse, Recipe } from '@shared/hello-fresh/hello-fresh.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelloFreshService {

  private apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTEzMDcyMjEsImp0aSI6IjNmY2Y0N2RkLWRjYjEtNDk0Mi1hMmU0LWQ1ZGY4MmUzYjdiOSIsImlhdCI6MTU4ODY3NzQ3OCwiaXNzIjoic2VuZiJ9.jJ41A8gJi3nxN85wfqVy1fmA1fmduTW-THMAh0riCTo';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<HelloFreshListResponse<Recipe>>(environment.helloFreshGW + '/recipes/recipes?country=be&locale=fr-BE', {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      }
    }).pipe(
      map((response: HelloFreshListResponse<Recipe>) => response.items)
    );
  }

}
