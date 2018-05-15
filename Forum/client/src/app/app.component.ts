import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, ActivationEnd } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Learn Angular Animations with 5 Examples
  // https://www.youtube.com/watch?v=mVqQDEtRBwA
  animations: [
    trigger('animateSidebar', [
      state('show', style({
        opacity: 1,
        // display: 'default',
        width: '25rem'
      })),
      state('hide', style({
        opacity: 0.25,
        // display: 'none',
        width: 0
      })),
      transition('hide => show', animate('1000ms ease-out')),
      transition('show => hide', animate('1000ms ease-in'))
  ])]
})

export class AppComponent implements OnInit {
  title = 'app';
  animateSidebarAttr: Boolean;
  userId: string;
  user: Object;
  constructor(
    private _mainService: MainService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.animateSidebarAttr = false;
    this.userId = null;
  }
  ngOnInit() {
    this._mainService.loggedUser.subscribe((data) => {
      this.userId = data;
      if (this.userId) this.userByIdGET();
    });
    this.setUser();
  }
  setUser() {
    this.user = {
      _id: null,
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
  showResErrors(res) {
    // TODO: decide on how to handle this.
    console.log(res['message']);
    console.log(res['errors']);
  }
  toggleSidebar() {  
    this.animateSidebarAttr = !this.animateSidebarAttr;
  }
  get toggleSidebarStateName() {
    return this.animateSidebarAttr ? 'show' : 'hide';
  }
  receiveNavbarUpdate($event) {
    this.toggleSidebar();
    // this.ngOnInit();
  }
}


