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

  /**
  * @description deleteTask function to delete a task from empId
  * @param empId
  * @param taskId
  * @returns status code 204 (no content)
  */

  deleteTask(empId: number, taskId: string) {
    console.log('/api/employees/' + empId + '/tasks/' + taskId);
    // delete task with taskId for employee with empId
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }

  /**
  * @description update function to update a task from empId
  * @param empId
  * @param todo
  * @param done
  * @returns status code 204 (no content)
  */

  updateTask(empId: number, todo: Item[], done: Item[]) {
    console.log('/api/employees/' + empId + '/tasks/');
    // update task for todo and done lists for employee with empId
    return this.http.put('/api/employees/' + empId + '/tasks/', { todo, done});
  }
}

