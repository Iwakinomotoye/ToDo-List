import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ITask } from './task.interface';

@Injectable({
    providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const Tasks:ITask[] = [
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
            },
            {id: 4,
            name: 'learn another javascript framework',
            priority: "high",
            deadline: new Date('02/20/2020')
            },
            {id: 5,
            name: 'update my linkedIn profile',
            priority: "low",
            deadline: new Date('01/30/2020')
            },
            {id: 6,
            name: 'join the HNG internship',
            priority: "medium",
            deadline: new Date('03/20/2020')
            }
        ];
        // you must return an object else it would error out url not found.
        return {Tasks};
    }

    genId(Tasks): number {
        return Tasks.length > 0 ? Math.max(...Tasks.map(Task => Task.id)) + 1 : 0;
    }
}