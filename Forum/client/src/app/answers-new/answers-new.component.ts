import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from './../main.service';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answers-new',
  templateUrl: './answers-new.component.html',
  styleUrls: ['./answers-new.component.css']
})
export class AnswersNewComponent implements OnInit {
  userId: String;
  user: any;
  questionId: String;
  question: any;
  answer: any;
  postNewAnswer: false;
  @Input('questionsAddAnswerForm')
  public questionsAddAnswerForm: FormGroup;
  @Input('questionsQuestionId')
  public questionsQuestionId: String;
  @Output() updateQuestionEvent = new EventEmitter<any>();
  // tslint:disable-next-line:max-line-length
  constructor(private _mainService: MainService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit() {
    console.log('answers new ngoninit');
    this._mainService.loggedUser.subscribe((data) => {
      this.userId = data;
    });
    this.setUser();
    this.setUserId();
    this.setQuestion();
    this.setQuestionId();
    this.setAnswer();
    this.userByIdGET();
    this.questionByIdGET();
  }
  setUserId() {
    // this.userId = '5acea435001a3839e89eb686';
    this._mainService.checkLoggedUser(() => {
      if (this.userId === '') {
        this._router.navigate(['login']);
      }
    });
  }
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
  setQuestionId() {
    // This will work if opening a new page, not if embedding a child component form.
    // this._route.params.subscribe( ( params: Params ) => {
    //   this.questionId = params['questionId'];
    //   console.log('secQuestionId', this.questionId);
    // });
    this.questionId = this.questionsQuestionId;
  }
  setQuestion() {
    this.question = {
      content: null,
      _user: null,
      _answer: [],
      createdAt: null,
      updatedAt: null
    };
  }
  setAnswer() {
    this.answer = {
      content: null,
      _user: null,
      _question: null,
      createdAt: null,
      updatedAt: null
    };
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
        console.log('questionByIdGET !err', this.question);
        return true;
      }
    });
    return false;
  }
  createAnswer() {
    // this.userByIdGET();
    // this.questionByIdGET();
    this.answer._user = this.userId;
    this.answer._question = this.questionId;
    this.answer.content = this.questionsAddAnswerForm.value['content'];
    this._mainService.createAnswer(this.answer, (res) => {
      if ( res['message'] !== 'Success' ) {
        // console.log('createAnswer err');
        // console.log(this.answer);
        this.showResErrors(res);
        // tslint:disable-next-line:max-line-length
        // TODO: Figure out how to show errors on html since can't use the same directive for errors for reactive forms as with as with template forms.
      } else {
        const savedAnswer = res['data'];
        this.addAnswerToUser(savedAnswer);
        this.addAnswerToQuestion(savedAnswer);
        this.clearAddAnswerForm();
        this.reloadQuestionsComponent();
      }
    });


    // TODO: This should be rewritten with promises or observables.
    // const myPromise = new Promise( (resolve, reject) => {
    //       console.log('in my promise');
    //       // let qResolve = false;
    //       // let uResolve = false;
    //       const qResolve = this.questionByIdGET();
    //       const uResolve = this.userByIdGET();
    //       console.log(qResolve, uResolve);
    //       if (qResolve && uResolve) {
    //         console.log('in resolve');
    //         resolve();
    //       } else {
    //         console.log('in reject');
    //         reject ();
    //       }
    //     }
    //   );
    //   myPromise.then( () => {
    //     console.log('in my promise then');
    //     this.answer._user = this.userId;
    //     this.answer._question = this.questionId;
    //     this.answer.content = this.questionsAddAnswerForm.value['content'];
    //     this._mainService.createAnswer(this.answer, (res) => {
    //       if ( res['message'] !== 'Success' ) {
    //         // console.log('createAnswer err');
    //         // console.log(this.answer);
    //         this.showResErrors(res);
    //       } else {
    //         const savedAnswer = res['data'];
    //         this.addAnswerToUser(savedAnswer);
    //         this.addAnswerToQuestion(savedAnswer);
    //       }
    //     });
        // console.log('in my promise then');
        // console.log('addAnswerToQuestion this.question', this.question);
        // this.question._answer.push(answer._id);
        // this.updateQuestion();
        // console.log('END addAnswerToQuestion this.question', this.question);
      // }
      // );


    // setTimeout( () => {this.userByIdGET(); this.questionByIdGET(); }, 5000);
    // this.answer._user = this.userId;
    // this.answer._question = this.questionId;
    // this.answer.content = this.questionsAddAnswerForm.value['content'];
    // // console.log('createAnswer', this.answer);
    // // console.log('this.question', this.question);
    // this._mainService.createAnswer(this.answer, (res) => {
    //   if ( res['message'] !== 'Success' ) {
    //     // console.log('createAnswer err');
    //     // console.log(this.answer);
    //     this.showResErrors(res);
    //   } else {
    //     const savedAnswer = res['data'];
    //     this.addAnswerToUser(savedAnswer);
    //     this.addAnswerToQuestion(savedAnswer);
    //   }
    // });
  }

  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }

  addAnswerToUser(answer) {
    this.user._answers.push(answer._id);
    this.updateUser();
  }
  updateUser() {
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
  addAnswerToQuestion(answer) {
    this.question._answer.push(answer._id);
    this.updateQuestion();
  }
  updateQuestion() {
    this._mainService.questionByIdUpdate( this.question, (res) => {
      if ( res['message'] !== 'Success' ) {
        // console.log('updateQuestion err');
        this.showResErrors(res);
      } else {
        // console.log('Success');
        this.questionByIdGET();
      }
    });
  }
  reloadQuestionsComponent() {
    this.updateQuestionEvent.emit('Answer');
  }
  clearAddAnswerForm() {
    this.questionsAddAnswerForm.reset();
  }
}
