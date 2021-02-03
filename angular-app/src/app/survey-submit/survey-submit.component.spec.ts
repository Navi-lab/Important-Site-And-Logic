import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubmitComponent } from './survey-submit.component';

describe('SurveySubmitComponent', () => {
  let component: SurveySubmitComponent;
  let fixture: ComponentFixture<SurveySubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
