import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersNewComponent } from './answers-new.component';

describe('AnswersNewComponent', () => {
  let component: AnswersNewComponent;
  let fixture: ComponentFixture<AnswersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
