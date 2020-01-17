import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ITask } from './task.interface';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    // write an interface to support the return value of every http request in this service.
    constructor(private http:HttpClient) {}
    
    url= 'api/Tasks';
    options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    getTasks():Observable<ITask[]> {
        return this.http.get<ITask[]>(this.url).pipe(
            // tap(data => console.log(data))
            catchError(this.handleError<ITask[]>('getTasks', []))
        );
    }
    addTask(task) {
        return this.http.post<ITask>(this.url,task,this.options).pipe(
            // tap(data => console.log('post ',data))
        )
    }
    updateTask(task) {
        // put returns null
        return this.http.put(this.url,task,this.options)
    }
    deleteTask(task){
        // delete returns null
        const url = `${this.url}/${task.id}`;
        return this.http.delete(url);
    }

    private handleError<T>(operation = 'operation', result?:T) {
        return (error:any): Observable<T> => {
            console.error('see', error);
            return of(result);
        }
    }
}