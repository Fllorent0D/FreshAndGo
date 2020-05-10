import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytSearchComponent } from './colruyt-search.component';

describe('ColruytSearchComponent', () => {
  let component: ColruytSearchComponent;
  let fixture: ComponentFixture<ColruytSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColruytSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
