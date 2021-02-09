import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsListItemComponent } from './ingredients-list-item.component';

describe('IngredientsListItemComponent', () => {
  let component: IngredientsListItemComponent;
  let fixture: ComponentFixture<IngredientsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
