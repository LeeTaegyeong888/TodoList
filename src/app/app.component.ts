import { Component } from '@angular/core';
import { TodoListService } from './manager/todolist/todo-list-service.service';
import { TodolistInterface } from './manager/todolist/todolist-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ToDoList';
  todoListService:TodoListService = new TodoListService;

  userTodoList:TodolistInterface[] = [];

  constructor(
    todoListService:TodoListService
  ) {
    this.todoListService = todoListService;
  }

  ngOnInit(): void { 
    this.userTodoList = (this.todoListService.getStorageList());
  }

}
