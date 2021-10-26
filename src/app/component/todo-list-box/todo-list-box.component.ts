import { Component, Input, OnInit } from '@angular/core';
import { TodolistInterface } from 'src/app/manager/todolist/todolist-interface';
@Component({
  selector: 'app-todo-list-box',
  templateUrl: './todo-list-box.component.html',
  styleUrls: ['./todo-list-box.component.css']
})
export class TodoListBoxComponent implements OnInit {
  
  @Input() userTodoList:TodolistInterface[] = [];
  
  todayUserList:TodolistInterface = {"currentDate":"", "listItem":[]};
  isToday:boolean = true;
  constructor() {}

  ngOnInit(): void {
    console.log("userTodoList  ::  ", this.userTodoList);
    this.getTodayUserData(this.userTodoList, 0);
    //console.log(" userData.currentDate ::", this.userTodoList[0]);
  }

  getTodayUserData(userTodoList:TodolistInterface[], index:number): void{
    if (this.userTodoList) {
      this.todayUserList = userTodoList[index];
    }
  }
  
  goTomorrowDate(): void {
    this.getTodayUserData(this.userTodoList, 1);
    this.isToday = false;
  }

  goToday(): void {
    this.getTodayUserData(this.userTodoList, 0);
    this.isToday = true;
  }

}
