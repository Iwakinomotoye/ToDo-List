import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CollapsibleSectionComponent } from './create-task/collapsible-section.component';
import { TaskListComponent } from './task-list/task-list.component';
import { DeleteTaskComponent } from './task-list/delete-task.component';
import { EditTaskComponent } from './task-list/edit-task.component';
import { InMemoryDataService } from './shared/in-memory-data.service';
import { HeaderComponent } from './header.component';
import { TOASTR_TOKEN, IToastr } from './shared/toastr.service';

let toastr:IToastr = window['toastr'];


@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskListComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    HeaderComponent,
    CollapsibleSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    {provide: TOASTR_TOKEN, useValue: toastr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
