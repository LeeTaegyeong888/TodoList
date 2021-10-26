import { Injectable } from '@angular/core';
import { TodolistInterface, successListInterface } from './todolist-interface';
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  todayDate:Date = new Date();
  currYear = this.todayDate.getFullYear(); 
  currMonth =  (this.todayDate.getMonth() + 1);
  currDay = this.todayDate.getDate();

  TodayDate:string = this.currYear + "년" + this.currMonth + "월" + this.currDay + "일";
  TomorrowDate:string = this.currYear + "년" + this.currMonth + "월" + (this.currDay + 1) + "일";
  deliverList:TodolistInterface[] = [];

  constructor() {}

  storageAvailable(type:any): boolean {
    console.log("storageAvailable +++");

    let isStorage;
    try {
      isStorage = window[type];
      let testStorage = "test_storage";
      localStorage.setItem(testStorage, testStorage);
      localStorage.removeItem(testStorage);
      console.log("check localstorage :: ", localStorage);
      return true;
    } catch (error) {
      if (error instanceof DOMException && (
        error.code === 22 || 
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ) &&
        (isStorage && isStorage.length !== 0)) {
          return false;
      } 
      
      console.error("DisAvailable storage :: ", error);
    }

    return false;
  }

  saveListItem(currDate:string, todoList:successListInterface[]): void {
    let result = localStorage.getItem("data");
    this.deliverList = [];

    if (typeof result === 'string') {
      const objData = JSON.parse(result);

      if (objData) {
        if (currDate === this.TodayDate) {
          this.makeTodoListArray(currDate, todoList, this.deliverList);
          this.makeTodoListArray(objData[1].currentDate, objData[1].listItem, this.deliverList);
        } else if (currDate === this.TomorrowDate) {
          this.makeTodoListArray(objData[0].currentDate, objData[0].listItem, this.deliverList);
          this.makeTodoListArray(currDate, todoList, this.deliverList);
        }

        localStorage.clear();
        console.log("this.deliverList :: ", this.deliverList);
        localStorage.setItem("data", JSON.stringify(this.deliverList));

      }
    }    
  }

  checkSaveDays(todoList:successListInterface[]): void {
    let result = localStorage.getItem("data");

    if (typeof result === 'string') {
      const objData = JSON.parse(result);

      if (objData) {
        if (objData[1].currentDate === this.TodayDate) {
          this.makeTodoListArray(objData[1].currentDate, objData[1].listItem, this.deliverList);
          this.makeTodoListArray(this.TomorrowDate, todoList, this.deliverList);
        } else if (objData[0].currentDate === this.TodayDate) {
          this.makeTodoListArray(objData[0].currentDate, objData[0].listItem, this.deliverList);
          this.makeTodoListArray(objData[1].currentDate, objData[1].listItem, this.deliverList);
        } else {
          this.makeTodoListArray(this.TodayDate, todoList, this.deliverList);
          this.makeTodoListArray(this.TomorrowDate, todoList, this.deliverList);
        }
        localStorage.clear();
        console.log("this.deliverList :: ", this.deliverList);
        localStorage.setItem("data", JSON.stringify(this.deliverList));

      }
    }
  }

  private makeTodoListArray(currDate:string, todoList: successListInterface[], deliverList:TodolistInterface[]) {
    deliverList.push({
      "currentDate" : currDate,
      "listItem" : todoList,
    });

    return deliverList;
  }

  public getStorageList(): any {
    console.log("check localstorage :: ", localStorage);

    let todoList:successListInterface[] = [];
    this.deliverList = [];
    
    if (this.storageAvailable('localStorage')) {
      if (localStorage.length === 0 ) {
        console.log("this.deliverList  :: ", this.deliverList);
        this.makeTodoListArray(this.TodayDate, todoList, this.deliverList);
        this.makeTodoListArray(this.TomorrowDate, todoList, this.deliverList);

        console.log(" deliverList :: ", this.deliverList);

        localStorage.setItem("data", JSON.stringify(this.deliverList));

        return this.deliverList;
      } else {
        this.checkSaveDays(todoList);

        return this.deliverList;
      }

    } else {
      this.makeTodoListArray(this.TodayDate, todoList, this.deliverList);
      this.makeTodoListArray(this.TomorrowDate, todoList, this.deliverList);
      console.log("disAvailable localStorage ++ ");
    }

    return this.deliverList;
  }
}
