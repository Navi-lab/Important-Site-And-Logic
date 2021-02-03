import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromHistoryComponent } from './from-history.component';

describe('FromHistoryComponent', () => {
  let component: FromHistoryComponent;
  let fixture: ComponentFixture<FromHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
