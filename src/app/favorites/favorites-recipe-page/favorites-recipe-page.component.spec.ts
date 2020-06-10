import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesRecipePageComponent } from './favorites-recipe-page.component';

describe('FavoritesRecipePageComponent', () => {
  let component: FavoritesRecipePageComponent;
  let fixture: ComponentFixture<FavoritesRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesRecipePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
