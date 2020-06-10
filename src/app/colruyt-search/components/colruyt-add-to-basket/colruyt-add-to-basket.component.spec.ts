import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytAddToBasketComponent } from './colruyt-add-to-basket.component';

describe('ColruytAddToBasketComponent', () => {
  let component: ColruytAddToBasketComponent;
  let fixture: ComponentFixture<ColruytAddToBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColruytAddToBasketComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytAddToBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
