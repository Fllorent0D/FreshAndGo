import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUstencilsPanelComponent } from './recipe-ustencils-panel.component';

describe('RecipeUstencilsPanelComponent', () => {
  let component: RecipeUstencilsPanelComponent;
  let fixture: ComponentFixture<RecipeUstencilsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeUstencilsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeUstencilsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
