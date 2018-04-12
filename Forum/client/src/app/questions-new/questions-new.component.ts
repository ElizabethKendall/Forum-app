import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ForumComponent } from '../forum/forum.component';

@Component({
  selector: 'app-questions-new',
  templateUrl: './questions-new.component.html',
  styleUrls: ['./questions-new.component.css']
})
export class QuestionsNewComponent implements OnInit {
  userId: String;
  user: any;
  question: any;
  constructor(private _mainService: MainService, private _router: Router, private _forumComponent: ForumComponent) {}

  ngOnInit() {
    this.setUserId();
    this.setUser();
    this.setQuestion();
    this.userByIdGET();
    console.log(this.user);
  }
  // TODO: this will have to be edited to pull logged in user's id from session
  setUserId() {
    this.userId = '5acea435001a3839e89eb686';
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
  setQuestion() {
    this.question = {
      content: null,
      _user: this.userId,
      _answer: [],
      createdAt: null,
      updatedAt: null
    };
  }
  createQuestion() {
    this._mainService.createQuestion( this.question, (res) => {
      if ( res['message'] !== 'Success') {
        this.showResErrors(res);
      } else {
        this.userByIdGET();
        this.addQuestionToUser(res['data']);
        this._forumComponent.postNewQuestion = false;
        this._forumComponent.ngOnInit();
        // this._router.navigate(['forum']);
      }
    });
    this.setQuestion();
    this.userByIdGET();
  }
  userByIdGET() {
    this._mainService.userByIdGET( this.userId, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        this.user = res['data'][0];
      }
    });
  }
  addQuestionToUser(question) {
    this.user._questions.push(question._id);
    this.updateUser();
  }
  updateUser() {
    this._mainService.userByIdUpdate( this.user, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        console.log('Success');
        this.userByIdGET();
      }
    });
  }
  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }

}
