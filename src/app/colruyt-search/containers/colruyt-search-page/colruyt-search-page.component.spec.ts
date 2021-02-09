import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytSearchPageComponent } from './colruyt-search-page.component';

describe('ColruytSearchPageComponent', () => {
  let component: ColruytSearchPageComponent;
  let fixture: ComponentFixture<ColruytSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColruytSearchPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
