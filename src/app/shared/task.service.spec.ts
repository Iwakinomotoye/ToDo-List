import { TaskService } from './task.service';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('TaskService', () => {
    let TASKS, taskService, mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj(['get', 'post', 'put', 'delete']);
        taskService = new TaskService(mockHttp);
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
    })
    
    describe('getTasks', () => {
        it('should be called with the correct url', () => {
            mockHttp.get.and.returnValue(of(false));

            taskService.getTasks();
            let url = 'api/Tasks';

            expect(mockHttp.get).toHaveBeenCalledWith(url);
        });
    });
    describe('addTask', () => {
        it('should be called with the correct url', () => {
            mockHttp.post.and.returnValue(of(false));
            let task = {
                name: 'sleep',
                priority: 'low',
                deadline: '02/02/2020'
            }
            
            taskService.addTask(task);
            let url = 'api/Tasks';
            let option = jasmine.any(Object);


            expect(mockHttp.post).toHaveBeenCalledWith(url, task, option);
        });
    });
    describe('updateTask', () => {
        it('should be called with the correct url', () => {
            mockHttp.put.and.returnValue(of(false));
            let task = {
                id: 2,
                name: 'sleep',
                priority: 'low',
                deadline: '02/02/2020'
            }
            
            taskService.updateTask(task);
            let url = 'api/Tasks';
            let option = jasmine.any(Object);

            expect(mockHttp.put).toHaveBeenCalledWith(url, task, option);
        });
    });
    describe('updateTask', () => {
        it('should be called with the correct url', () => {
            mockHttp.put.and.returnValue(of(false));
            let task = {
                id: 2,
                name: 'sleep',
                priority: 'low',
                deadline: '02/02/2020'
            }
            
            taskService.updateTask(task);
            let url = 'api/Tasks';
            let option = jasmine.any(Object);

            expect(mockHttp.put).toHaveBeenCalledWith(url, task, option);
        });
    });
    describe('deleteTask', () => {
        it('should be called with the correct url', () => {
            mockHttp.delete.and.returnValue(of(false));
            let task = {
                id: 2,
                name: 'sleep',
                priority: 'low',
                deadline: '02/02/2020'
            }
            taskService.deleteTask(task);

            let url = 'api/Tasks';

            expect(mockHttp.delete).toHaveBeenCalledWith(`${url}/${task.id}`);
        });
    });
})
