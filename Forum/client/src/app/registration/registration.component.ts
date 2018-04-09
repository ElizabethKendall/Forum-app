import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	
	user: object;

	constructor(private _service: MainService) {
		this.user = {firstName: '', lastName: '', email: '', password: ''}
	}

	ngOnInit() {}

	register(){
		console.log('component ',this.user);
		this._service.register(this.user, (res) => {
			console.log('back in component, route done.', res.data);
		});
	}

}
