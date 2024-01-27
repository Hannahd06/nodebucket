/**
    Title: task.service.ts
    Author: Professor Richard Krasso
    Modified by: Hannah Del Real
    Date: 01/15/24
    Description: Task service
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient ) { }
  // Get tasks from database
     getTask(empId: number) {
      return this.http.get('/api/employees/' + empId + '/tasks');

  }

    addTask(empId: number, text: Item) {
      return this.http.post('/api/employees/' + empId + '/tasks', { text } );
    }
}
