import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTitlePanelComponent } from './recipe-title-panel.component';

describe('RecipeTitlePanelComponent', () => {
  let component: RecipeTitlePanelComponent;
  let fixture: ComponentFixture<RecipeTitlePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeTitlePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTitlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
