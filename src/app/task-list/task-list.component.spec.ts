import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { DebugElement } from '@angular/core';
import { EditTaskComponent } from './edit-task.component';
import { DeleteTaskComponent } from './delete-task.component';
import { TaskService } from '../shared/task.service';
import { TOASTR_TOKEN } from '../shared/toastr.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';


describe('TaskListComponent', () => {
    let fixture: ComponentFixture<TaskListComponent>;
    let element: HTMLElement;
    let mockTaskService, mockToastrService, editTaskComponentDEs, TASKS;

    beforeEach(() => {
        mockTaskService = jasmine.createSpyObj(['deleteTask']);
        mockToastrService = jasmine.createSpyObj(['error']);
        TestBed.configureTestingModule({
            declarations: [
                TaskListComponent,
                EditTaskComponent,
                DeleteTaskComponent
            ],
            providers: [
                {provide: TaskService, useValue: mockTaskService},
                {provide: TOASTR_TOKEN, useValue: mockToastrService}
            ]
        });

        fixture = TestBed.createComponent(TaskListComponent);
        element = fixture.nativeElement;
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
        fixture.componentInstance.Tasks = TASKS;
    })
    describe('cancel', () => {
        it('should toggle the class "cancel" on the element', () => {
            fixture.componentInstance.filteringBy = 'all';
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();
            let input = fixture.debugElement.query(By.css('input')).nativeElement;
            let mockEvent = {target: input};
            
            fixture.componentInstance.cancel(mockEvent);

            // expect(input.classList).toContain('cancel');
            expect(input).toHaveClass('cancel');
        })
    })
    describe('ngOnChanges', () => {
        //this test covers the filterBy function
        it('should set the filteredTasks by the filteringby property', () => {
            // if a property is to be setup by ngOnChanges, you dont need to initialize that
            // property. e.g fixture.componentInstance.filteredTasks in this case.
            fixture.componentInstance.filteringBy = 'high';
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();
            expect(fixture.componentInstance.filteredTasks.length).toEqual(2);
        })
    })
    describe('DeleteTaskComponent', () => {
        it('should emit the delete click event and call onDelete()', () => {
            fixture.componentInstance.Tasks = TASKS;
            mockTaskService.deleteTask.and.returnValue(of(false));

            // spyOn(fixture.componentInstance, 'onDelete').and.callThrough();
            fixture.componentInstance.onDelete = jasmine.createSpy('');
            fixture.componentInstance.ngOnChanges();
            window.confirm =  () => {return true;}
            fixture.detectChanges();

            
            let DeleteTaskComponentDEs = fixture.debugElement.queryAll(By.directive(
                DeleteTaskComponent));
            DeleteTaskComponentDEs[0].query(By.css('div'))
                .triggerEventHandler('click', null);

            expect(fixture.componentInstance.onDelete).toHaveBeenCalled();
        })
    })
    describe('onDelete', () => {
        it('should reduce the length of Task and filteredTasks if window.confirm is true', () => {
            fixture.componentInstance.Tasks = TASKS;
            fixture.componentInstance.filteringBy = 'high';
            mockTaskService.deleteTask.and.returnValue(of(false));
            fixture.componentInstance.ngOnChanges();
            window.confirm =  () => {return true;}
            fixture.detectChanges();

            fixture.componentInstance.onDelete(TASKS[0]);
            // console.log(fixture.componentInstance.Tasks);
            // console.log(fixture.componentInstance.filteredTasks);
            expect(fixture.componentInstance.Tasks.length).toBe(2);
            expect(fixture.componentInstance.filteredTasks.length).toBe(1);
        });
        it('should not reduce the length of Task and filtered if window.confirm is false', () => {
            fixture.componentInstance.Tasks = TASKS;
            fixture.componentInstance.filteringBy = 'high';
            mockTaskService.deleteTask.and.returnValue(of(false));
            fixture.componentInstance.ngOnChanges();
            window.confirm =  () => {return false;}
            fixture.detectChanges();

            fixture.componentInstance.onDelete(TASKS[0]);
            // console.log(fixture.componentInstance.Tasks);
            // console.log(fixture.componentInstance.filteredTasks);
            expect(fixture.componentInstance.Tasks.length).toBe(3);
            expect(fixture.componentInstance.filteredTasks.length).toBe(2);
        });
        it('should call toastrService and taskService', () => {
            fixture.componentInstance.Tasks = TASKS;
            fixture.componentInstance.filteringBy = 'high';
            mockTaskService.deleteTask.and.returnValue(of(false));
            mockToastrService.error.and.returnValue(of(false));
            fixture.componentInstance.ngOnChanges();
            window.confirm =  () => {return true;}
            fixture.detectChanges();

            fixture.componentInstance.onDelete(TASKS[0]);

            expect(mockTaskService.deleteTask).toHaveBeenCalledWith(TASKS[0]);
            expect(mockToastrService.error).toHaveBeenCalledWith('Task Deleted');
        });
        //check if subscription is made to the return value of taskService.deleteTask
        
    })
    describe('EditTaskComponent', () => {
        it('should emit the edit click event and call onEdit()', () => {
            fixture.componentInstance.filteredTasks;
            fixture.componentInstance.filteringBy = 'all';
            // fixture.componentInstance.onEdit = jasmine.createSpy(''); or
            spyOn(fixture.componentInstance, 'onEdit').and.callThrough()
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();
            editTaskComponentDEs = fixture.debugElement.queryAll(By.directive(EditTaskComponent));
            
            editTaskComponentDEs[0].query(By.css('div')).triggerEventHandler('click', null);

            expect(fixture.componentInstance.onEdit).toHaveBeenCalledWith(TASKS[0]);
        })
    });
    describe('changeColor', () => {
        it('should return #fa0(yellow) if task.priority is medium', () => {
            fixture.componentInstance.filteredTasks;
            fixture.componentInstance.filteringBy = 'all';
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();

            fixture.componentInstance.changeColor(TASKS[1]);

            expect(fixture.componentInstance.changeColor(TASKS[1]))
            .toEqual({'background-color': '#fa0'})
        })
        it('should return red if task.priority is medium', () => {
            fixture.componentInstance.filteredTasks;
            fixture.componentInstance.filteringBy = 'all';
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();

            fixture.componentInstance.changeColor(TASKS[0]);

            expect(fixture.componentInstance.changeColor(TASKS[0]))
            .toEqual({'background-color': 'red'})
        })
        it('should return #0a4(green) if task.priority is medium', () => {
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
                priority: "low",
                deadline: new Date('02/10/2020')
                }
            ];
            fixture.componentInstance.filteredTasks;
            fixture.componentInstance.filteringBy = 'all';
            fixture.componentInstance.ngOnChanges();
            fixture.detectChanges();

            fixture.componentInstance.changeColor(TASKS[2]);

            expect(fixture.componentInstance.changeColor(TASKS[2]))
            .toEqual({'background-color': '#0a4'})
        })
    });
})
