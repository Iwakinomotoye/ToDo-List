import { Component } from '@angular/core';
import { TaskService } from './shared/task.service';
import { ITask } from './shared/task.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" *ngIf="this.Tasks">
      <app-header></app-header>
      <app-create-task [Task]="Task" (newTask)="onNewTask($event)" (clearTask)="onClearTask()">
      </app-create-task>
      <app-task-list [Tasks]="Tasks" (taskToEdit)="onEditTask($event)" 
      (newTasks)="onNewTasks($event)"></app-task-list>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private taskService:TaskService){}
  Tasks:ITask[];
  Task:ITask;
  ngOnInit() {
    this.taskService.getTasks().subscribe((Tasks) => {
      this.Tasks = Tasks;
    })
  }
  onNewTask(task){
      let result = this.Tasks.map(Task => Task.id)
      let index = result.indexOf(task.id);
      if(index > -1) {
        this.Tasks[index] = { ...task };
      } else {
        this.Tasks.push(task);
      }
  }
  onClearTask() {
    this.Task = undefined;
  }
  onEditTask(task) {
    this.Task = task;
  }
  onNewTasks(event) {
    this.Tasks = event;
  }
}
