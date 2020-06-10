import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytSearchModalComponent } from './colruyt-search-modal.component';

describe('ColruytSearchModalComponent', () => {
  let component: ColruytSearchModalComponent;
  let fixture: ComponentFixture<ColruytSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColruytSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
