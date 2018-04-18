import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MainService {

  constructor(private _http: HttpClient) { }

  findAllQuestions(cb) {
    this._http.get('/questions').subscribe( (res) => { cb(res); });
  }

  createQuestion(question, cb) {
    this._http.post('/questions', question).subscribe( (res) => { cb(res); });
  }

  questionDelete(questionId, cb) {
    this._http.delete('/questions/' + questionId).subscribe( (res) => { cb(res); });
  }

  userByIdGET( userId, cb ) {
    this._http.get('/users/' + userId).subscribe( (res) => { cb(res); });
  }

  userByIdUpdate(user, cb) {
    const uri = '/users/' + user._id;
    this._http.put(uri, user).subscribe( (res) => { cb(res); });
  }

  questionByIdGET(questionId, cb) {
    this._http.get('/questions/' + questionId).subscribe( (res) => { cb(res); });
  }

  createAnswer(answer, cb) {
    this._http.post('/answers', answer).subscribe( (res) => { cb(res); });
  }

  questionByIdUpdate(question, cb) {
    const uri = '/questions/' + question._id;
    this._http.put(uri, question).subscribe( (res) => { cb(res); });
  }

}
