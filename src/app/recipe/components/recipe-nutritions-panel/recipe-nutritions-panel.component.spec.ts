import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNutritionsPanelComponent } from './recipe-nutritions-panel.component';

describe('RecipeNutritionsPanelComponent', () => {
  let component: RecipeNutritionsPanelComponent;
  let fixture: ComponentFixture<RecipeNutritionsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeNutritionsPanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNutritionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
