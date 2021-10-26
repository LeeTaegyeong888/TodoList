import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListBoxComponent } from './component/todo-list-box/todo-list-box.component';
import { TodoTargetComponent } from './component/todo-target/todo-target.component';
import { TodoListService } from './manager/todolist/todo-list-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoTargetComponent,
    TodoListBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
