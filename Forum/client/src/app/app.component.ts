import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, ActivationEnd } from '@angular/router';

import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private _mainService: MainService,
    private _route: ActivatedRoute,
    private _router: Router) {}
    ngOnInit() {}
  }


