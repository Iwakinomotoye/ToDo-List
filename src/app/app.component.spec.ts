import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AppComponent } from './app.component';
import { TaskService } from './shared/task.service';
import { HeaderComponent } from './header.component';
import { TOASTR_TOKEN } from './shared/toastr.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from './task-list/edit-task.component';
import { DeleteTaskComponent } from './task-list/delete-task.component';
import { CollapsibleSectionComponent } from './create-task/collapsible-section.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let mockTaskService,mockToastrService, TASKS
    beforeEach(() => {
        mockTaskService = jasmine.createSpyObj(['getTasks', 'addTask'])
        mockToastrService = jasmine.createSpyObj(['success', 'error'])
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                AppComponent,
                TaskListComponent,
                CreateTaskComponent,
                HeaderComponent
            ],
            providers: [
                {provide: TaskService, useValue: mockTaskService},
                {provide: TOASTR_TOKEN, useValue: mockToastrService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
        TASKS = [
            {id: 1,
            name: 'build mini netflix app',
            priority: "high",
            deadline: new Date('01/20/2020')
            },
            {id: 2,
            name: 'build more website using sass',
            priority: "Medium",
            deadline: new Date('01/30/2020')
            },
            {id: 3,
            name: 'build a portfolio',
            priority: "high",
            deadline: new Date('02/10/2020')
            }
        ];
        
    });
    describe('ngOnInit', () => {
        it('should call taskService.getTasks and should set value of Tasks', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            fixture.detectChanges();

            expect(mockTaskService.getTasks).toHaveBeenCalled();
            expect(fixture.componentInstance.Tasks.length).toEqual(3);
        });
    });
    describe('onNewTask', () => {
        it('should replace the task if the id already exist in the list of tasks', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            fixture.detectChanges();
            let task = {id: 1,
                name: 'build mini netflix app',
                priority: "low",
                deadline: new Date('01/20/2020')
                }
    
            fixture.componentInstance.onNewTask(task);
            
            expect(fixture.componentInstance.Tasks.length).toEqual(3);
        });
        it('should push the new task if the id doesnt exist in the list of tasks', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            fixture.detectChanges();
            let task = {
                id: 4,
                name: 'sleep',
                priority: "low",
                deadline: new Date('01/20/2020')
                };
    
            fixture.componentInstance.onNewTask(task);
            
            expect(fixture.componentInstance.Tasks.length).toEqual(4);
            expect(fixture.componentInstance.Tasks[3].name).toEqual('sleep');
        });
    });
    describe('onClearTask', () => {
        it('should clear task values and make it undefined', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            fixture.componentInstance.Task = {
                id: 4,
                name: 'sleep',
                priority: "low",
                deadline: new Date('01/20/2020')
                };
            fixture.detectChanges();
    
            fixture.componentInstance.onClearTask();
    
            expect(fixture.componentInstance.Task).toBe(undefined);
        })
    });
    describe('onEditTask', () => {
        it('should set task value to the parameter of onEditTask method', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            let task = {
                id: 2,
                name: 'sleep',
                priority: "low",
                deadline: new Date('01/20/2020')
                };
            fixture.detectChanges();
    
            fixture.componentInstance.onEditTask(task);
    
            expect(fixture.componentInstance.Task).toBe(task);
        })
    });
    describe('onNewTasks', () => {
        it('should set task value to the parameter of onNewTask method', () => {
            mockTaskService.getTasks.and.returnValue(of(TASKS));
            let tasks =  [
                {id: 1,
                name: 'build mini netflix app',
                priority: "high",
                deadline: new Date('01/20/2020')
                },
                {id: 2,
                name: 'build more website using sass',
                priority: "Medium",
                deadline: new Date('01/30/2020')
                }
            ];
            fixture.detectChanges();
    
            fixture.componentInstance.onNewTasks(tasks);

            expect(fixture.componentInstance.Tasks).toEqual(tasks);
        });
    });
    describe('CreateTaskComponent', () => {
        it('should call onNewTask method when the add or update button is clicked', () => {
            fixture.componentInstance.Tasks = TASKS;
            mockTaskService.getTasks.and.returnValue(of(TASKS));

            let task = {
                valid: true,
                value: {
                    name: 'sleep',
                    priority: "low",
                    deadline: new Date('01/20/2020')
                }
            };
            mockTaskService.addTask.and.returnValue(of(task.value));
            // spyOn(fixture.componentInstance, 'onNewTask').and.callThrough();
            fixture.componentInstance.onNewTask = jasmine.createSpy('');
            fixture.detectChanges();
            let createComponentDEs = fixture.debugElement.queryAll(By.directive(CreateTaskComponent));
            
            (<CreateTaskComponent>createComponentDEs[0].componentInstance).onNgSubmit(task);
            
            expect(fixture.componentInstance.onNewTask).toHaveBeenCalled();
        })
    })
})
