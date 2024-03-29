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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  // deleteTask
  deleteTask(taskId: string) {
    console.log(`Task Item: ${taskId}`);

    // Dialog box to confirm deletion of task
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    // Call the deleteTask function from taskService and subscribe t o observable and pass in the empId
    this.taskService.deleteTask(this.empId, taskId).subscribe({
      // If task is deleted, remove it from todo or done array
      next: (res: any) => {
        console.log('Task with taskId', taskId);
        // If todo list is empty return empty array
        if (!this.todo) {
          this.todo = [];
        }

         // If done list is empty return empty array
         if (!this.done) {
          this.done = [];
        }

        // Filter through todo list for taskId, and delete task
        this.todo = this.todo.filter(t => t._id?.toString() !== taskId);

        // Filter through done list for taskId, and delete task
        this.done = this.done.filter(t => t._id?.toString() !== taskId);

        // Success message
        this.successMessage = "Task deleted successfully!";

        // allow user to dismiss alert
        this.hideAlert();
      },

      // if an error occurs, display error message
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;

        // allow user to dismiss alert
        this.hideAlert();
      }
    })
  }

  // Drop event for todo and done list using cdkDragDrop directive from drag and drop module
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
       // If the item is dropped in the same container, move it to the new index
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    // Log updated list
    console.log('Moved item in array', event.container.data);

    // Call the updateTaskList() function and pass in the empId, todo and done arrays

    this.updateTaskList(this.empId, this.todo, this.done);

  } else {
    // If item is dropped into a different container, move it to the other container
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
      )

      // Log updated list
      console.log('Moved item in array', event.container.data);

      // call the updateTaskList() function and pass in the empId, todo, and done arrays
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }


  // Set a timeout for alert displays
  hideAlert() {
    setTimeout( () => {
      this.errorMessage = '';
      this.successMessage= '';
    }, 5000)
  }

  /**
   * description: Updates the task list for empId and passes todo and done list
   * @param empId
   * @param todo
   * @param done
   * @returns void
   */
  updateTaskList(empId: number, todo: Item[], done: Item[]) {

    this.taskService.updateTask(empId, todo, done).subscribe({
      next:(res: any) => {
        console.log('Task updated successfully');
      },

      // if an error occurs, display error message
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        if (err = new Error('Unable to update task for empId' + empId) ) {
          this.errorMessage = 'No tasks have been updated.';
        }

        // allow user to dismiss alert
        this.hideAlert();
      }
    })

  }


/** Use getTask and initiate a switch case to update with a value for categoryColor of the task object
 * User selects a category choice from radio button selections for category.
 * The categoryColor is dictated by the corresponding color associated with the categoryTitle selected.
 * Ensures that all values in Item schema are inputted so a new task can be added to the todo list.
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
