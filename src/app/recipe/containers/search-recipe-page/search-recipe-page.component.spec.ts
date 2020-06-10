import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecipePageComponent } from './search-recipe-page.component';

describe('SearchRecipePageComponent', () => {
  let component: SearchRecipePageComponent;
  let fixture: ComponentFixture<SearchRecipePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRecipePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
