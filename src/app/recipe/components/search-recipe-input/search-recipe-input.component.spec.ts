import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRecipeInputComponent } from './search-recipe-input.component';

describe('SearchRecipeInputComponent', () => {
  let component: SearchRecipeInputComponent;
  let fixture: ComponentFixture<SearchRecipeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRecipeInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRecipeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
