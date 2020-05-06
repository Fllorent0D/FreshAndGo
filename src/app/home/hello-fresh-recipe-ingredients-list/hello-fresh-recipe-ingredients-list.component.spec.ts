import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloFreshRecipeIngredientsListComponent } from './hello-fresh-recipe-ingredients-list.component';

describe('HelloFreshRecipeIngredientsListComponent', () => {
  let component: HelloFreshRecipeIngredientsListComponent;
  let fixture: ComponentFixture<HelloFreshRecipeIngredientsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloFreshRecipeIngredientsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloFreshRecipeIngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
