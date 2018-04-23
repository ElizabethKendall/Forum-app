import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: object;

	constructor(private _service: MainService, private _router: Router) {
		this.user = {email: '', password: ''}
	}

	ngOnInit() {}

	login(){
		this._service.login(this.user, (res) => {
			if(res.data){
				//successfully logged in
				this._router.navigate(['']);
			} else {
				if(res.message == "Success" || res.message == "Incorrect Email"){
					document.getElementById('invalepw').innerHTML = "Incorrect email or password.";
				} else {
					document.getElementById('invalepw').innerHTML = "Error. Please try again.";
				}
			}
		});
	}

}
