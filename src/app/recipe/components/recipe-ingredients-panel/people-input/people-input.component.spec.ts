import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInputComponent } from './people-input.component';

describe('PeopleInputComponent', () => {
  let component: PeopleInputComponent;
  let fixture: ComponentFixture<PeopleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
