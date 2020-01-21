import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { Inject } from '@angular/core';
import { TOASTR_TOKEN, IToastr } from '../shared/toastr.service';

@Component({
    selector: 'app-create-task',
    templateUrl: './create-task.component.html',
    styles: [`
    .form {
        width: 90%;
        margin: 0 auto;
    }
    .form div:first-of-type {
        padding-top: 20px;
    }
    .btn {
        width: 48%;
        height: 50px;
        font-size: 15px;
    }
    .btn {
        margin-bottom: 30px;
    }
    .btn:first-of-type {
        margin-right: 4%;
    }
    .error {
        color: #E05C65;
        font-size: 16px;
    }
    .input-error input, .input-error select {
        background: #F3C3C5;
        border: red;
    }
    @media screen and (min-width: 576px){}
    `]
})

export class CreateTaskComponent {
    @Input() Task;
    @Output() newTask = new EventEmitter();
    @Output() clearTask = new EventEmitter();
    @ViewChild("taskForm", {static:false}) formElement;
    constructor(private taskService:TaskService,
        @Inject(TOASTR_TOKEN) private toastrService: IToastr
        ){}
    emptyTask = {
        // it would automatically generate an id from the genId() method in the 
        // InMemoryDataService if and only if it finds out that id doest exist, hence
        // we dont need to create an id property.
        name: '',
        priority: '',
        deadline: ''
    };
    ngOnChanges() {
        if(typeof(this.Task) !== "object") {
            this.Task = this.emptyTask 
        } else {
            this.Task = {
                id: this.Task.id,
                name: this.Task.name.toLocaleLowerCase(),
                priority: this.Task.priority.toLocaleLowerCase(),
                deadline: this.Task.deadline
            }
        }
    }
    onNgSubmit(task){
        if(task.valid){
            if(!this.Task.id){
                this.taskService.addTask(task.value).subscribe((returnedTask) => {
                    this.newTask.emit(returnedTask);
                    this.toastrService.success('New Task Added');
                    this.reset();
                })
            } else {
                this.taskService.updateTask(this.Task).subscribe(() => {
                    this.newTask.emit(this.Task);
                    this.toastrService.success('Task Updated');
                    this.reset();
                });
            }
        } 
        // else {
        //     console.log('no');
        // }
    }
    reset() {
        this.formElement.resetForm();
        this.Task = this.emptyTask;
        this.clearTask.emit();
    }
}
