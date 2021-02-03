import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyManualComponent } from './survey-manual.component';

describe('SurveyManualComponent', () => {
  let component: SurveyManualComponent;
  let fixture: ComponentFixture<SurveyManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
