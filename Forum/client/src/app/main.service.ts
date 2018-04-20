import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainService {

	constructor(private _http: HttpClient) {}

	register(user, cb){
		console.log('service ',user);
		this._http.post('/users', user).subscribe((res) => {
			console.log('back in service');
			cb(res);
		});
	}

	login(user, cb){
		console.log('service ',user);
		this._http.post('/login', user).subscribe((res) => {
			console.log('back in service');
			cb(res);
		})
	}

}