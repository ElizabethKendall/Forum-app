import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	
	user: object;
	confirmPassword: string;

	constructor(private _service: MainService, private _rotuer: Router) {
		this.user = {firstName: '', lastName: '', email: '', password: ''}
		this.confirmPassword = '';
	}

	ngOnInit() {}

	register(){
		this.confirmPassword = '';
		this._service.register(this.user, (res) => {
			if(res.message == "Taken Email"){
				document.getElementById('takenemail').innerHTML = "Email is already in use.";
			} else if(res.message == "Model Error"){

				if(res.errors.errors.firstName){
					document.getElementById('fnameerr').innerHTML = res.errors.errors.firstName.message;
				}

				if (res.errors.errors.lastName) {
					document.getElementById('lnameerr').innerHTML = res.errors.errors.lastName.message;
				}

				if (res.errors.errors.email) {
					document.getElementById('emailerr').innerHTML = res.errors.errors.email.message;
				}

				if (res.errors.errors.password) {
					document.getElementById('pwerr').innerHTML = res.errors.errors.password.message;
				}

			} else if(res.message == "Success"){
				//successfully logged in
				this._rotuer.navigate(['']);
			} else {
				document.getElementById('extraerrors').innerHTML = "Error. Please try again.";
			}
		});
	}

}
