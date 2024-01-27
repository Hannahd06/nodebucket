/**
 * Title: tasks.component.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 01/17/24
 */

import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from '../shared/task.service';
import { Employee } from '../shared/employee.interface';
import { Item } from '../shared/item.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {

  employee: Employee
  empId: number;
  todo: Item[];
  done: Item[];
  errorMessage: string;
  successMessage:string;

  newTaskForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    category: [null, Validators.required]
  })

  constructor (private cookieService: CookieService, private taskService: TaskService, private fb:FormBuilder) {
    this.employee = {} as Employee
    this.todo = []
    this.done = []
    this.errorMessage = ''
    this.successMessage = ''

    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.taskService.getTask(this.empId).subscribe({
      // gets the empId from logged in user
      next: (res: any) => {
        console.log('Employee', res);
        this.employee = res;
      },

      error: (err) => {
        console.error('error', err);
        this.hideAlert();
      },

      complete: () => {
        console.log('complete')
        // get array of todo items
         this.employee.todo ? this.todo = this.employee.todo : this.todo = [];
        // get an array of done items
        this.employee.done ? this.done = this.employee.done : this.done = [];

        console.log('todo', this.todo);
        console.log('done', this.done);
      }
    })
  }

  addTask() {
    // get task description from user input
    const text = this.newTaskForm.controls['text'].value;

    // get task category from radio buttons selection
    const category = this.newTaskForm.controls['category'].value;


    // Create a variable to hold both the text and category object values from user input
    let newTask = this.getTask(text, category)

    // Add Task
    this.taskService.addTask(this.empId, newTask).subscribe({
      next: (task: any) => {
        console.log('Task added with id ', task.id);
        newTask._id = task.id; // update new task id with generated task id
        // Push new task to todo list array
        this.todo.push(newTask);
        this.newTaskForm.reset(); // Reset the form

        // Alert message to notify user that task was added
        this.successMessage = "Task has been added successfully";
        console.log(this.successMessage)

        this.hideAlert();
      },

      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.err;
        this.hideAlert();
      }

    })
  }
  // Set a timeout for alert displays
  hideAlert() {
    setTimeout( () => {
      this.errorMessage = '';
      this.successMessage= '';
    }, 5000)
  }


/** Use getTask and initiate a switch case to update with a value for categoryColor of the task object
 * based on user's choice for radio button for category
 * Ensures that all values in I schema are inputted so a new task can be added
 */
  getTask(text: string, categoryTitle: string) {

    let task: Item = {} as Item

    // Colors for each category
    const green ='#127800';
    const blue = '#046eb0';
    const red = '#cc0000';
    const yellow = '#9e9602';

    switch (categoryTitle) {

    // If user selects meetings button, categoryColor value is updated to variable green value
      case 'meetings':
        task = {
          text: text,
          category: {
            categoryTitle: categoryTitle,
            categoryColor: green
          }
        }
        return task

    // If user selects projects button, categoryColor is updated to variable blue value
        case 'projects':
          task = {
            text: text,
            category: {
              categoryTitle: categoryTitle,
              categoryColor: blue
            }
          }
          return task

    // If user selects tests button, categoryColor is updated to variable red value
          case 'tests':
            task = {
              text: text,
              category: {
                categoryTitle: categoryTitle,
                categoryColor: red
              }
            }
            return task
    // If user selects miscellaneous button, categoryColor defaults to variable yellow value
            default:
            task = {
              text: text,
              category: {
                categoryTitle: categoryTitle,
                categoryColor: yellow
              }
            }
            return task
    }

  }

}
