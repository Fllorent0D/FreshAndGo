import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIngredientsPanelComponent } from './recipe-ingredients-panel.component';

describe('RecipeIngredientsPanelComponent', () => {
  let component: RecipeIngredientsPanelComponent;
  let fixture: ComponentFixture<RecipeIngredientsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeIngredientsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIngredientsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
