import { Component, OnInit, Input} from '@angular/core';
import { TodoListService } from 'src/app/manager/todolist/todo-list-service.service';
import { TodolistInterface } from 'src/app/manager/todolist/todolist-interface';

@Component({
  selector: 'app-todo-target',
  templateUrl: './todo-target.component.html',
  styleUrls: ['./todo-target.component.css']
})
export class TodoTargetComponent implements OnInit {
  
  @Input() toDoList:TodolistInterface = {"currentDate":"", "listItem":[]};
  
  clickEvent:boolean = false;
  isModify:boolean = false;
  todoListService:TodoListService = new TodoListService;
  constructor(
    todoListService:TodoListService
  ) {
    this.todoListService = todoListService;
  }
  
  ngOnInit(): void {
    console.log(this.toDoList);
  }

  ngOnChanges(): void {}

  onAddItem(): void {
    console.log("onAddItem ++ ");
    let inputDocId = <HTMLInputElement>document.getElementById('list-input');
    let inputValue = inputDocId.value;
    
    this.toDoList.listItem.push({
      category: inputValue,
      isSuccess: false
    });
    inputDocId.value = "";

    this.clickEvent = false;

    this.todoListService.saveListItem(this.toDoList.currentDate, this.toDoList.listItem);
  }

  onDeleteMode(index:number): void {
    console.log("onDeleteMode :: " + index);
    this.toDoList.listItem.splice(index, 1);
    console.log("this.toDoList.listItem :: ",this.toDoList.listItem);

    this.todoListService.saveListItem(this.toDoList.currentDate, this.toDoList.listItem);
  }

  onSuccessList(index:number) {
    this.toDoList.listItem[index].isSuccess = !this.toDoList.listItem[index].isSuccess;

    console.log("this.toDoList.listItem :: ",this.toDoList.listItem);

    this.todoListService.saveListItem(this.toDoList.currentDate, this.toDoList.listItem);
  }
  


}
