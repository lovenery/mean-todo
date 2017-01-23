import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
})
export class TodosComponent  {
	todos: Todo[];
	constructor(private todoService: TodoService){
		this.todoService.getTasks().subscribe(todos => {
			this.todos = todos;
		});
	}
}

interface Todo {
	title: string;
	isDone: boolean;
}