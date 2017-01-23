import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
	constructor(private http: Http) {
		console.log('TodoService Load');
	}
	getTasks() {
		return this.http.get('/api/todos')
			.map(res => res.json())
	}
	addTodo(newTodo: Object) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/todo', JSON.stringify(newTodo), { headers: headers })
			.map(res => res.json());
	}
	deleteTodo(id: string) {
		return this.http.delete('/api/todo/' + id)
			.map(res => res.json());
	}
}