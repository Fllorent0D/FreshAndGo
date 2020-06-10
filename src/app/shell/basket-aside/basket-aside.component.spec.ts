import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketAsideComponent } from './basket-aside.component';

describe('BasketAsideComponent', () => {
  let component: BasketAsideComponent;
  let fixture: ComponentFixture<BasketAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketAsideComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
