import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloFreshRecipeCardComponent } from './hello-fresh-recipe-card.component';

describe('HelloFreshRecipeCardComponent', () => {
  let component: HelloFreshRecipeCardComponent;
  let fixture: ComponentFixture<HelloFreshRecipeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelloFreshRecipeCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloFreshRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
