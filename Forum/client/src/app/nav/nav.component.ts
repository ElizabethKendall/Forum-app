import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainService } from './../main.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() updateAppEvent = new EventEmitter<any>();
  userId: string;

  constructor(private _mainService: MainService) {
    this.userId = null;
  }

  ngOnInit() {
    this._mainService.loggedUser.subscribe((data) => {
      this.userId = data;
    });
  }
  talkToAppComponent() {
    this.updateAppEvent.emit('Nav');
  }
}
