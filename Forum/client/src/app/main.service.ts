import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainService {

	loggedUser: BehaviorSubject<object>;

	constructor(private _http: HttpClient) {
		this.loggedUser = new BehaviorSubject({unlogged: true});
	}

	register(user, cb){
		this._http.post('/users', user).subscribe((res) => {
			cb(res);
		});
	}

	login(user, cb){
		this._http.post('/login', user).subscribe((res) => {
			cb(res);
		})
	}

	checkLoggedUser(cb){
		this._http.get('/checkLoggedUser').subscribe((res) => {
			if(res['message'] == "Logged"){
				this.loggedUser.next(res['user']);
			}
			cb();
		})
	}

}