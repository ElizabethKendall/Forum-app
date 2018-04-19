import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from './../main.service';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments-new',
  templateUrl: './comments-new.component.html',
  styleUrls: ['./comments-new.component.css']
})
export class CommentsNewComponent implements OnInit {
  userId: String;
  user: any;
  questionId: String;
  question: any;
  answer: any;
  postNewAnswer: false;
  @Input('questionsAddCommentForm')
  public questionsAddCommentForm: FormGroup;
  @Input('questionsQuestionId')
  public questionsQuestionId: String;
  @Input('questionsAnswerId')
  public questionsAnswerId: String;
  @Output() updateQuestionEvent = new EventEmitter<any>();

  constructor(private _mainService: MainService, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
  }

}
