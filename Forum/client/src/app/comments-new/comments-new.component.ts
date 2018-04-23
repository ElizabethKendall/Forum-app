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
  answerId: String;
  comment: any;
  commentContent: String;
  postNewComment: false;
  @Input('questionsAddCommentForm')
  public questionsAddCommentForm: FormGroup;
  @Input('questionsQuestionId')
  public questionsQuestionId: String;
  @Input('questionsAnswerId')
  public questionsAnswerId: String;
  @Input('questionsUserId')
  public questionsUserId: String;
  @Output() updateQuestionEvent = new EventEmitter<any>();

  constructor(private _mainService: MainService, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
    console.log('in comments-new ngOnInit');
    this.setCommentInitial();
    this.userId = this.questionsUserId;
    this.user = this.userByIdGET();
    this.answerId = this.questionsAnswerId;
    this.answer = this.answerByIdGET();
  }

  setCommentNew() {
    this.comment.content = this.commentContent;
    this.comment._user = this.userId;
    this.comment._question = this.questionId;
    this.comment._answer = this.answerId;
  }

  postComment() {
    // TODO: Reimplement with promises?
    this.setQuestionsFormIds();
    // this.setQuestionsFormObjects();
    this.setCommentNew();
    this.createComment();
    // console.log('in postComment', this.comment);
  }

  createComment() {
    // console.log('in createComment');
    this._mainService.createComment(this.comment, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
        // tslint:disable-next-line:max-line-length
        // TODO: Figure out how to show errors on html since can't use the same directive for errors for reactive forms as with as with template forms.
      } else {
        // console.log('Success');
        const savedComment = res['data'];
        console.log('Proceeding to addCommentToUser!');
        this.comment = savedComment;
        console.log('savedComment', savedComment);
        // TODO: set the user and answer from the database with promises.
        this.addCommentToUser(savedComment);
        this.addCommentToAnswer(savedComment);
        this.clearAddCommentForm();
        this.reloadQuestionsComponent();
        // console.log('question: ', this.question);
        // console.log('answer: ', this.answer);
        // console.log('user: ', this.user);
      }
    });
  }
  reloadQuestionsComponent() {
    this.updateQuestionEvent.emit(this.comment);
  }
  clearAddCommentForm() {
    this.questionsAddCommentForm.reset();
  }

  addCommentToUser(comment) {
    this.user._comments.push(comment._id);
    this.updateUser();
  }
  updateUser() {
    // console.log('in updateUser');
    this._mainService.userByIdUpdate( this.user, (res) => {
      if ( res['message'] !== 'Success' ) {
        // console.log('updateUser err');
        this.showResErrors(res);
      } else {
        // console.log('Success');
        this.userByIdGET();
      }
    });
  }
  addCommentToAnswer(comment) {
    this.answer._comments.push(comment._id);
    this.updateAnswer();
  }
  updateAnswer() {
    // console.log('in updateAnswer');
    this._mainService.answerByIdUpdate( this.answer, (res) => {
      if ( res['message'] !== 'Success' ) {
        // console.log('updateAnswer err');
        this.showResErrors(res);
      } else {
        // console.log('Success');
        this.answerByIdGET();
      }
    });
  }

  setCommentInitial() {
    this.comment = {
      content: null,
      _user: null,
      _question: null,
      _answer: null,
      createdAt: null,
      updatedAt: null
    };
  }

  setQuestionsFormIds() {
    // This is for readability.
    this.userId = this.questionsUserId;
    this.questionId = this.questionsQuestionId;
    this.answerId = this.questionsAnswerId;
    this.commentContent = this.questionsAddCommentForm.controls.content.value;
  }

  setQuestionsFormObjects() {
    // this.question = this.questionByIdGET();
    this.answer = this.answerByIdGET();
    this.user = this.userByIdGET();
    // console.log('in setQuestionsFormObjects');
    // console.log('question: ', this.question);
    // console.log('answer: ', this.question);
    // console.log('user: ', this.user);
  }

  userByIdGET() {
    this._mainService.userByIdGET( this.userId, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.user = res['data'][0];
        return true;
      }
    });
    return false;
  }
  questionByIdGET() {
    this._mainService.questionByIdGET( this.questionId, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.question = res['data'][0];
        // console.log('questionByIdGET !err', this.question);
        return true;
      }
    });
    return false;
  }
  answerByIdGET() {
    this._mainService.answerByIdGET( this.answerId, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.answer = res['data'][0];
        // console.log('answerByIdGET !err', this.answer);
        return true;
      }
    });
    return false;
  }
  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }
}
