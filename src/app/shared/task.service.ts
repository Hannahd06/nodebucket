import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient ) { }
  // Get tasks from database
    getTasks(empId: number) {
      return this.http.get('/api/employees/' + empId + '/tasks' );
    }

    addTask(empId: number, text: string) {
      return this.http.post('/api/employees/' + empId + '/tasks', { text } );
    }
}
