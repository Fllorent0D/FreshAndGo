import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepsPanelComponent } from './recipe-steps-panel.component';

describe('RecipeStepsPanelComponent', () => {
  let component: RecipeStepsPanelComponent;
  let fixture: ComponentFixture<RecipeStepsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStepsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
