import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEmailComponent } from './survey-email.component';

describe('SurveyEmailComponent', () => {
  let component: SurveyEmailComponent;
  let fixture: ComponentFixture<SurveyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
