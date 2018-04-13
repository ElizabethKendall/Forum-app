import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: object;

	constructor(private _service: MainService) {
		this.user = {email: '', password: ''}
	}

	ngOnInit() {}

	login(){
		console.log('component ',this.user);
		this._service.login(this.user, (res) => {
			console.log('back in component. route done', res);
		});
	}

}
