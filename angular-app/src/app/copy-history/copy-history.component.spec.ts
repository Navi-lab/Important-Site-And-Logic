import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyHistoryComponent } from './copy-history.component';

describe('CopyHistoryComponent', () => {
  let component: CopyHistoryComponent;
  let fixture: ComponentFixture<CopyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
