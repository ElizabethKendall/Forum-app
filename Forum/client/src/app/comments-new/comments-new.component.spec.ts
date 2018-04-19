import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsNewComponent } from './comments-new.component';

describe('CommentsNewComponent', () => {
  let component: CommentsNewComponent;
  let fixture: ComponentFixture<CommentsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
