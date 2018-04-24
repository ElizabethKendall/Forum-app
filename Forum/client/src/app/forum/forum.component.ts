import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Pipe, PipeTransform} from '@angular/core';
import { FilterForumTablePipe } from './../filter-forum-table.pipe';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  userId: String;
  user: any;
  allQuestions: [any];
  postNewQuestion: Boolean;
  queryString: String;
  constructor(private _mainService: MainService, private _router: Router) {
    this.userId = '';
  }
  ngOnInit() {
    this._mainService.loggedUser.subscribe((data) => {
      this.userId = data;
    });
    this.setUserId();
    this.setUser();
    this.findAllQuestions();
    this.userByIdGET();
  }
  findAllQuestions() {
    this._mainService.findAllQuestions( (res) => {
      if (res.message === 'Success') {
        this.allQuestions = res.data;
        console.log('allQuestions', this.allQuestions);
      } else {
        // console.log(res.errors);
      }
    });
  }
  // TODO: this will have to be edited to pull logged in user's id from session
  setUserId() {
    // this.userId = '5acea435001a3839e89eb686';
    this._mainService.checkLoggedUser(() => {
      if (this.userId === ''){
        this._router.navigate(['login']);
      }
      // console.log(this.userId);
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
  questionDelete(questionId) {
    this._mainService.questionDelete(questionId, (res) => {
      if (res.message !== 'Success') {
        this.showResErrors(res);
      } else {
        this.questionRemoveFromUser(questionId);
        this.findAllQuestions();
      }
    } );
  }
  questionRemoveFromUser(questionId) {
    const idx = this.user._questions.indexOf(questionId);
    if (idx > -1) {
      this.user._questions.splice(idx, 1);
      this.updateUser();
    }
  }
  updateUser() {
    this._mainService.userByIdUpdate( this.user, (res) => {
      if ( res['message'] !== 'Success' ) {
        this.showResErrors(res);
      } else {
        // console.log('Success');
        this.userByIdGET();
      }
    });
  }
  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }
  togglePostNewQuestion() {
    this.postNewQuestion = !this.postNewQuestion;
    this.updateQuestionsNewFormText();
    this.ngOnInit();
  }
  updateQuestionsNewFormText() {
    const htmlElement = document.getElementById('questions-new-anchor');
    if (this.postNewQuestion) {
      htmlElement.textContent = 'Post New Question';
    } else {
      htmlElement.textContent = 'Cancel New Question';
    }
  }
}
