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

  findAllQuestions(cb) {
    this._http.get('/questions').subscribe( (res) => { cb(res); });
  }

  createQuestion(question, cb) {
    this._http.post('/questions', question).subscribe( (res) => { cb(res); });
  }

  questionDelete(questionId, cb) {
    this._http.delete('/questions/' + questionId).subscribe( (res) => { cb(res); });
  }

  questionByIdGET(questionId, cb) {
    this._http.get('/questions/' + questionId).subscribe( (res) => { cb(res); });
  }

  questionByIdUpdate(question, cb) {
    const uri = '/questions/' + question._id;
    this._http.put(uri, question).subscribe( (res) => { cb(res); });
  }

  userByIdGET( userId, cb ) {
    this._http.get('/users/' + userId).subscribe( (res) => { cb(res); });
  }

  userByIdUpdate(user, cb) {
    const uri = '/users/' + user._id;
    this._http.put(uri, user).subscribe( (res) => { cb(res); });
  }

  answerByIdGET( answerId, cb ) {
    this._http.get('/answers/' + answerId).subscribe( (res) => { cb(res); });
  }

  answerByIdUpdate(answer, cb) {
    const uri = '/answers/' + answer._id;
    this._http.put(uri, answer).subscribe( (res) => { cb(res); });
  }

  createAnswer(answer, cb) {
    this._http.post('/answers', answer).subscribe( (res) => { cb(res); });
  }

  commentByIdGET( commentId, cb ) {
    this._http.get('/comments/' + commentId).subscribe( (res) => { cb(res); });
  }

  commentByIdUpdate(comment, cb) {
    const uri = '/comments/' + comment._id;
    this._http.put(uri, comment).subscribe( (res) => { cb(res); });
  }

  createComment(comment, cb) {
    this._http.post('/comments', comment).subscribe( (res) => { cb(res); });
  }

  answerDelete(answerId, cb) {
    this._http.delete('/answers/' + answerId).subscribe( (res) => { cb(res); });
  }

  commentDelete(commentId, cb) {
    this._http.delete('/comments/' + commentId).subscribe( (res) => { cb(res); });
  }

}