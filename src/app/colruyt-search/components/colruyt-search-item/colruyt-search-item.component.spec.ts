import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytSearchItemComponent } from './colruyt-search-item.component';

describe('ColruytSearchItemComponent', () => {
  let component: ColruytSearchItemComponent;
  let fixture: ComponentFixture<ColruytSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColruytSearchItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
