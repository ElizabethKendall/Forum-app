import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

	loggedUser: object;

	constructor(private _service: MainService, private _router: Router) {
		this.loggedUser = {unlogged: true}
	}

	ngOnInit() {
		this._service.loggedUser.subscribe((data) => {
			this.loggedUser = data;
		});
		this.checkLoggedUser();
	}

	checkLoggedUser(){
		this._service.checkLoggedUser(() => {
			if(this.loggedUser['unlogged']){
				this._router.navigate(['login']);
			}
		});
	}

}
