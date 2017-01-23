import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
	constructor(private http: Http) {
		console.log('TodoService Load');
	}
	getTasks() {
		return this.http.get('http://localhost:3000/api/todos')
			.map(res => res.json())
	}
}