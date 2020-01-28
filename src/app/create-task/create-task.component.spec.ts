import { CreateTaskComponent } from './create-task.component';
import { of } from 'rxjs';

describe('CreateTaskComponent', () => {
    let createTaskComponent: CreateTaskComponent;
    let mockTaskService, mockToastrService;

    beforeEach(() => {
        mockTaskService = jasmine.createSpyObj([ 'addTask', 'updateTask']);
        mockToastrService = jasmine.createSpyObj(['success']);
        createTaskComponent = new CreateTaskComponent(mockTaskService, mockToastrService);
    });

    describe('ngOnChanges', () => {
        it('should set Task to an emptyTask if Task is not an object', () => {
            createTaskComponent.Task = undefined;
            createTaskComponent.emptyTask = {
                name: '',
                priority: '',
                deadline: ''
            };

            createTaskComponent.ngOnChanges();

            expect(createTaskComponent.Task).toBe(createTaskComponent.emptyTask);
        });

        it('should set Task.name and Task.priority to lowercase', () => {
            createTaskComponent.Task = {name: 'TOYE', priority: 'HIGH'};

            createTaskComponent.ngOnChanges();

            expect(createTaskComponent.Task.name).toBe('toye');
            expect(createTaskComponent.Task.priority).toBe('high');
        });
    });

    describe('reset', () => {
        it('set Task property to emptyTask', () => {
            createTaskComponent.Task = {name: 'TOYE', priority: 'HIGH'};
            let mockForm = {resetForm: () => {}};
            createTaskComponent.formElement = mockForm;
            createTaskComponent.ngOnChanges(); 
            createTaskComponent.reset();
            expect(createTaskComponent.Task.name).toBe('');
        })
    })

    describe('ngOnSubmit', () => {
        let valid;
        let Value;
        it(`should call taskService.addTask, toastrService and reset to be called if Task
             has no id`, () => {
            createTaskComponent.Task = undefined;
            valid = true;
            Value = {
                name: 'toye',
                priority: 'low',
                deadline: '01/20/2020'
            };
            mockTaskService.addTask.and.returnValue(of(false));
            mockToastrService.success.and.returnValue(of(false));
            let mockForm = {resetForm: () => {}};
            createTaskComponent.formElement = mockForm;
            createTaskComponent.reset = jasmine.createSpy('');
            createTaskComponent.ngOnChanges();
            createTaskComponent.onNgSubmit({valid: valid, value: Value});
            
            expect(mockTaskService.addTask).toHaveBeenCalled();
            expect(mockToastrService.success).toHaveBeenCalledWith('New Task Added');
            expect(createTaskComponent.reset).toHaveBeenCalled();
        });
        it(`should call taskService.updateTask, toastrService and reset to be called if 
            Task has an id`, () => {
            createTaskComponent.Task = {
                id: 1,
                name: 'toye',
                priority: 'low',
                deadline: '01/20/2020'
            };
            valid = true;
            Value = {
                name: 'toye',
                priority: 'low',
                deadline: '01/20/2020'
            };
            mockTaskService.updateTask.and.returnValue(of(false));
            mockToastrService.success.and.returnValue(of(false));
            let mockForm = {resetForm: () => {}};
            createTaskComponent.formElement = mockForm;
            // createTaskComponent.reset = jasmine.createSpy('');
            spyOn(createTaskComponent, 'reset').and.callThrough()
            createTaskComponent.ngOnChanges();

            createTaskComponent.onNgSubmit({valid: valid, value: Value});
            expect(mockTaskService.updateTask).toHaveBeenCalled();
            expect(mockToastrService.success).toHaveBeenCalledWith('Task Updated');
            expect(createTaskComponent.reset).toHaveBeenCalled();
        });
    })
})
