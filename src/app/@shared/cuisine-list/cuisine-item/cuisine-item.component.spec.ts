import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineItemComponent } from './cuisine-item.component';

describe('CuisineItemComponent', () => {
  let component: CuisineItemComponent;
  let fixture: ComponentFixture<CuisineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuisineItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
