import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColruytLoginComponent } from './colruyt-login.component';

describe('ColruytLoginComponent', () => {
  let component: ColruytLoginComponent;
  let fixture: ComponentFixture<ColruytLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColruytLoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColruytLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
