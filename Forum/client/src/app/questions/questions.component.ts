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
  userXpOpts: Object;
  userXp: String;
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
    this.userXp = '1';
    this.userXpOpts = [ [1, 'GUI 01: Add answers and comments inline.'],
                        [2, 'GUI 02: Add answers or comments at bottom of screen']
                      ];
  }
  receiveUpdatedQuestion($event) {
    console.log('in receiveUpdatedQuestion');
    console.log('$event', $event);
    console.log('$event.constructor.name', $event.constructor.name);
    if ($event === 'Answer') {
      this.togglePostNewAnswer();
      this.ngOnInit();
    } else {
      this.togglePostNewComment($event['_id']);
      this.ngOnInit();
    }
    // } else {
    //   alert('ERROR IN receiveUpdatedQuestion');
    // }
  }
  ngOnInit() {
    console.log('in ngOnInit');
    this._mainService.loggedUser.subscribe((data) => {
      this.userId = data;
    });
    this.setQuestionId();
    this.setQuestion();
    this.setUserId();
    this.setUser();
    this.questionByIdGET();
    this.userByIdGET();
    // this.setQuestionIdAnswersNewComponent();
    // this.setUserIdAnswersNewComponent();
  }
  setUserId() {
    // this.userId = '5acea435001a3839e89eb686';
    this._mainService.checkLoggedUser(() => {
      if (this.userId === '') {
        this._router.navigate(['login']);
      }
      // console.log(this.userId);
    });
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
        // console.log('questionByIdGET this.question:', this.question);
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
    // TODO: Need to emit to child comment form something to tell it to reset.
  }

  updateCommentsNewFormText(answerId) {
    // console.log('in updateCommentsNewFormText');
    const elementId = 'comments-new-anchor-' + answerId;
    // console.log('elementId', elementId);
    const htmlElement = document.getElementById(elementId);
    // console.log('htmlElement', htmlElement);
    // if (!this.postNewComment) {
    //   htmlElement.textContent = 'Post New Comment';
    // } else {
    //   htmlElement.textContent = 'Cancel New Comment';
    // }
    if (htmlElement) {
      if (htmlElement.textContent === 'Post New Comment') {
        htmlElement.textContent = 'Cancel New Comment';
      } else {
        htmlElement.textContent = 'Post New Comment';
      }
    }

    // this.ngOnInit();
  }

  questionDelete(questionId) {
    this._mainService.questionDelete(questionId, (res) => {
      if (res.message !== 'Success') {
        this.showResErrors(res);
      } else {
        this.questionRemoveFromUser(questionId);
        this._router.navigate(['/forum']);
      }
    } );
  }
  questionRemoveFromUser(questionId) {
    const idx = this.user['_questions'].indexOf(questionId);
    if (idx > -1) {
      this.user['_questions'].splice(idx, 1);
      this.userUpdate();
    }
  }
  userUpdate() {
    console.log('in userUpdate');
    this._mainService.userByIdUpdate( this.user, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        console.log('Success');
        this.userByIdGET();
      }
    });
  }
  userByIdGET() {
    this._mainService.userByIdGET( this.userId, (res) => {
      console.log('forum / userByIdGET');
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.user = res['data'][0];
        console.log(this.user);
      }
    });
  }
  answerDelete(answerId) {
    this._mainService.answerDelete(answerId, (res) => {
      if (res.message !== 'Success') {
        console.log('in answerDelete err');
        this.showResErrors(res);
      } else {
        console.log('in answerDelete !err');
        this.answerRemoveFromUser(answerId);
        this.answerRemoveFromQuestion(answerId);
        // this._router.navigate(['/forum']);
      }
    } );
  }
  answerRemoveFromUser(answerId) {
    // console.log('in answerRemoveFromUser');
    // console.log('UNSPLICED this.user[\'_answers\']', this.user['_answers']);
    const idx = this.user['_answers'].indexOf(answerId);
    if (idx > -1) {
      // console.log('found idx:', idx);
      this.user['_answers'].splice(idx, 1);
      // console.log('SPLICED this.user[\'_answers\']', this.user['_answers']);
      this.userUpdate();
    } else {
      // console.log('didn\'t find idx:', idx);
      // console.log(answerId);
    }
  }
  answerRemoveFromQuestion(answerId) {
    // console.log('in answerRemoveFromQuestion');
    // console.log('UNSPLICED this.question[\'_answer\']', this.question['_answer']);
    // loop through each item in this.question['_answer'] with idx
      // if item._id === answerId
        // set itemId = idx
        // use splice to remove the item from _answer
        // call questionUpdate()
        // break
    for (let idx = 0; idx < this.question['_answer'].length; idx++) {
      const item = this.question['_answer'][idx];
      let itemIdx = -1;
      if (item._id === answerId) {
        itemIdx = idx;
        // console.log('found itemIdx:', itemIdx);
        this.question['_answer'].splice(itemIdx, 1);
        // console.log('SPLICED this.question[\'_answer\']', this.question['_answer']);
        this.questionUpdate();
      } else {
        // console.log('didn\'t find idx:', idx);
        // console.log(answerId);
      }
    }
  }

  commentDelete(commentId, answer) {
    this._mainService.commentDelete(commentId, (res) => {
      if (res.message !== 'Success') {
        console.log('in commentDelete err');
        this.showResErrors(res);
      } else {
        console.log('in commentDelete !err');
        this.commentRemoveFromUser(commentId);
        this.commentRemoveFromAnswer(commentId, answer);
        // this._router.navigate(['/forum']);
      }
    } );
  }
  commentRemoveFromUser(commentId) {
    console.log('in commentRemoveFromUser');
    console.log('UNSPLICED this.user[\'_comments\']', this.user['_comments']);
    const idx = this.user['_comments'].indexOf(commentId);
    if (idx > -1) {
      console.log('found idx:', idx);
      this.user['_comments'].splice(idx, 1);
      console.log('SPLICED this.user[\'_comments\']', this.user['_comments']);
      this.userUpdate();
    } else {
      console.log('didn\'t find idx:', idx);
      console.log(commentId);
    }
  }
  commentRemoveFromAnswer(commentId, answer) {
    console.log('in commentRemoveFromAnswer');
    console.log('UNSPLICED answer[\'_comments\']', answer['_comments']);
    for (let idx = 0; idx < answer['_comments'].length; idx++) {
      const item = answer['_comments'][idx];
      let itemIdx = -1;
      if (item._id === commentId) {
        itemIdx = idx;
        console.log('found itemIdx:', itemIdx);
        answer['_comments'].splice(itemIdx, 1);
        console.log('SPLICED answer[\'_comments\']', answer['_comments']);
        this.answerUpdate(answer);
        // TODO: If doesn't update the page, then run getQuestionById();
      } else {
        console.log('didn\'t find idx:', idx);
        console.log(commentId);
      }
    }
  }
  questionUpdate() {
    console.log('in questionUpdate');
    this._mainService.questionByIdUpdate( this.question, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        console.log('Success');
        this.questionByIdGET();
      }
    });
  }
  answerUpdate(answer) {
    console.log('in answerUpdate');
    this._mainService.answerByIdUpdate( answer, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        console.log('Success');
        this.answerByIdGET(answer);
      }
    });
  }
  answerByIdGET(answer) {
    this._mainService.answerByIdGET( answer._id, (res) => {
      console.log('forum / answerByIdGET');
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        // answer = res['data'][0];
        console.log(answer);
      }
    });
  }
}
