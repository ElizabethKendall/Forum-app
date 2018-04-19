import { Component, OnInit, ViewChild} from '@angular/core';
import { MainService } from './../main.service';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnswersNewComponent } from '../answers-new/answers-new.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  userId: String;
  user: Object;
  questionId: String;
  question: Object;
  postNewAnswer: Boolean;
  postNewComment: Boolean;
  postNewCommentAnswerId: String;
  addAnswerForm: FormGroup;
  addCommentForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private _mainService: MainService, private _router: Router, private _route: ActivatedRoute, _formBuilder: FormBuilder) {
    this.addAnswerForm = _formBuilder.group({
      'answer': _formBuilder.group({
        content: ['', Validators.required]
      })
    });
    this.addCommentForm = _formBuilder.group({
      'comment': _formBuilder.group({
        content: ['', Validators.required]
      })
    });
  }
  receiveUpdatedQuestion($event) {
    console.log('in receiveUpdatedQuestion', $event);
    this.togglePostNewAnswer();
    this.ngOnInit();
  }
  ngOnInit() {
    this.setQuestionId();
    this.setQuestion();
    this.setUserId();
    this.setUser();
    this.questionByIdGET();
    // this.setQuestionIdAnswersNewComponent();
    // this.setUserIdAnswersNewComponent();
  }
  setUserId() {
    this.userId = '5acea435001a3839e89eb686';
  }
  setQuestionId() {
    this._route.params.subscribe( ( params: Params ) => {
      this.questionId = params['id'];
    });
  }
  // setQuestionIdAnswersNewComponent() {
  //   this._answersNewComponent.questionId = this.questionId;
  // }
  // setUserIdAnswersNewComponent() {
  //   this._answersNewComponent.userId = this.userId;
  // }

  setUser() {
    this.user = { _id: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      _questions: [],
      _answers: [],
      _comments: [],
      createdAt: null,
      updatedAt: null
    };
  }
  setQuestion() {
    this.question = {
      content: null,
      _user: { firstName: null,
        lastName: null,
        email: null,
        password: null,
        _questions: [],
        _answers: [],
        _comments: [],
        createdAt: null,
        updatedAt: null
      },
      _answer: [],
      createdAt: null,
      updatedAt: null
    };
  }
  questionByIdGET() {
    this._mainService.questionByIdGET( this.questionId, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.question = res['data'][0];
        // console.log(this.question);
      }
    });
  }
  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }
  togglePostNewAnswer() {
    this.postNewAnswer = !this.postNewAnswer;
    this.updateAnswersNewFormText();
    // this.ngOnInit();
  }
  updateAnswersNewFormText() {
    const htmlElement = document.getElementById('answers-new-anchor');
    if (!this.postNewAnswer) {
      htmlElement.textContent = 'Post New Answer';
    } else {
      htmlElement.textContent = 'Cancel New Answer';
    }
  }
  togglePostNewComment(answerId) {
    // console.log('in togglePostNewComment');
    console.log('this.postNewComment', this.postNewComment);
    if (!this.postNewComment) {
      // console.log('in 1');
      this.postNewComment = !this.postNewComment;
      this.updateCommentsNewFormText(answerId);
      this.postNewCommentAnswerId = answerId;
    } else if (this.postNewCommentAnswerId === answerId) {
      // console.log('in 2');
      this.postNewComment = !this.postNewComment;
      this.updateCommentsNewFormText(answerId);
      this.postNewCommentAnswerId = null;
    } else if ( this.postNewComment && this.postNewCommentAnswerId !== answerId) {
      // console.log('in 3');
      this.updateCommentsNewFormText(this.postNewCommentAnswerId);
      this.postNewCommentAnswerId = answerId;
      this.updateCommentsNewFormText(answerId);
    } else {
      // console.log('in 4');
      window.alert('UNKNOWN ERROR WITH TOGGLE POST NEW COMMENT');
    }
  }

  updateCommentsNewFormText(answerId) {
    console.log('in updateCommentsNewFormText');
    const elementId = 'comments-new-anchor-' + answerId;
    console.log('elementId', elementId);
    const htmlElement = document.getElementById(elementId);
    console.log('htmlElement', htmlElement);
    // if (!this.postNewComment) {
    //   htmlElement.textContent = 'Post New Comment';
    // } else {
    //   htmlElement.textContent = 'Cancel New Comment';
    // }
    if (htmlElement.textContent === 'Post New Comment') {
      htmlElement.textContent = 'Cancel New Comment';
    } else {
      htmlElement.textContent = 'Post New Comment';
    }
    // this.ngOnInit();
  }
}
