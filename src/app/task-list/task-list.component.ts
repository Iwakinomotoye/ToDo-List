import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

import { TaskService } from '../shared/task.service';
import { ITask } from '../shared/task.interface';
import { TOASTR_TOKEN, IToastr } from '../shared/toastr.service';

@Component({
    selector: 'app-task-list',
    template: `
    <div class="task-list-handler">
        <div>{{filteredTasks?.length}} Tasks</div>
        <div class="button-group">
        <button (click)="filterBy('all')" class="btn btn-outline-secondary">All</button>
        <button (click)="filterBy('low')" class="btn btn-outline-secondary">Low</button>
        <button (click)="filterBy('medium')" class="btn btn-outline-secondary">Medium</button>
        <button (click)="filterBy('high')" class="btn btn-outline-secondary">High</button>
        </div>
    </div>
    <ul>
        <li *ngFor="let task of filteredTasks">
            <div class="checkbox">
                <input name="checkbox" type="checkbox" (click)='cancel($event)'>
                <div class='next-line'>
                <div class="task-name">{{task.name | titlecase}}</div>
                <div class="task-deadline">Deadline: {{task.deadline | date: 'MMM d, y'}}</div>
                <div class="task-group">
                <div class="dot" [ngStyle]="changeColor(task)"></div>
                <edit-task class="edit-task" (edit)="onEdit(task)"></edit-task>
                <delete-task class="delete-task" (delete)="onDelete(task)"></delete-task>
                </div>
                </div>

            </div>
        </li>
    </ul>
    <div class="copyright">&copy; Copyright 2020 ToDo. All rights reserved.</div>
    `,
    styleUrls: ['./task-list.component.css']

})
export class TaskListComponent {
    constructor(private taskService:TaskService,
        @Inject(TOASTR_TOKEN) private toastrService: IToastr){}
    @Input() Tasks:ITask[];
    filteredTasks: ITask[];
    @Output() taskToEdit = new EventEmitter();
    @Output() newTasks = new EventEmitter()
    cancel(event) {
        event.target.classList.toggle('cancel');
    }
    ngOnChanges() {
        console.log('enter')
        if(this.Tasks) {
            this.filteredTasks = this.Tasks;
        }
    }
    filterBy(name) {
        if(name == 'all') {
            this.filteredTasks = this.Tasks;
        } else {
            this.filteredTasks = this.Tasks
                .filter(fT => fT.priority.toLocaleLowerCase() == name);
        }  
    }

    changeColor(task) {
        if(task.priority.toLocaleLowerCase() === 'high') {
            return {'background-color': 'red'}
        } else if(task.priority.toLocaleLowerCase() === 'medium') {
            return {'background-color': '#fa0'}
        } else if(task.priority.toLocaleLowerCase() === 'low') {
            return {'background-color': '#0a4'}
        }
    }
    onDelete(task) {
        this.Tasks = this.Tasks.filter(Task => Task.id !== task.id)
        this.filteredTasks = this.filteredTasks.filter(Task => Task.id !== task.id)
        // this.Tasks lost its connection to his parent property, this.Tasks, when we
        // assinged it to the filter array two lines above, but by emiting the new array
        // to the parent container, as done below, and in the parent component, we assign 
        // the new array to the parent 
        //this.Tasks we make ngOnChanges get called in the child component, so that the 
        // child's this.Tasks is reassigned to it parent property, this.Tasks.
        this.newTasks.emit(this.Tasks);
        this.toastrService.error('Task Deleted')
        // write a http request for this.
        this.taskService.deleteTask(task).subscribe();
    }
    onEdit(task) {
        this.taskToEdit.emit(task);
    }
}