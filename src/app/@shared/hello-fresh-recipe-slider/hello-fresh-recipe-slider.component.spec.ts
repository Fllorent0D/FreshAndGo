import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloFreshRecipeSliderComponent } from './hello-fresh-recipe-slider.component';

describe('HelloFreshRecipeSliderComponent', () => {
  let component: HelloFreshRecipeSliderComponent;
  let fixture: ComponentFixture<HelloFreshRecipeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelloFreshRecipeSliderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloFreshRecipeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
