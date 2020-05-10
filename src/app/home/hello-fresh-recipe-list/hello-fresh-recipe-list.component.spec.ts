import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloFreshRecipeListComponent } from './hello-fresh-recipe-list.component';

describe('HelloFreshRecipeListComponent', () => {
  let component: HelloFreshRecipeListComponent;
  let fixture: ComponentFixture<HelloFreshRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelloFreshRecipeListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloFreshRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
