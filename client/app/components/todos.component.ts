import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
})
export class TodosComponent  {
	todos: Todo[];
	title: string;

	constructor(private todoService: TodoService){
		this.todoService.getTasks().subscribe(todos => {
			this.todos = todos;
		});
	}

	addTodo(event: Object) {
		// event.preventDefault();
		// console.log(this.title); // two way binding
		let newTodo = {
			title: this.title,
			isDone: false
		};
		this.todoService.addTodo(newTodo).subscribe(todo => {
			this.todos.push(newTodo);
			this.title = '';
		})
	}

	deleteTodo(objId: string) {
		let todos = this.todos;
		this.todoService.deleteTodo(objId).subscribe(data => {
			if(data.n == 1) {
				for (var i = 0; i < todos.length; ++i) {
					if(todos[i]._id == objId) {
						todos.splice(i, 1);
					}
				}
			}
		});
	}

	updateStatus(todo: any) {
		// console.log(todo.isDone); // obj
		let _todo = {
			id: todo._id,
			title: todo.title,
			isDone: !todo.isDone // new
		};
		this.todoService.updateStatus(_todo).subscribe(data => {
			todo.isDone = !todo.isDone; // new
		});
	}
}

interface Todo {
	title: string;
	isDone: boolean;
}