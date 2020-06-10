import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineItemSkeletonComponent } from './cuisine-item-skeleton.component';

describe('CuisineItemSkeletonComponent', () => {
  let component: CuisineItemSkeletonComponent;
  let fixture: ComponentFixture<CuisineItemSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuisineItemSkeletonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
