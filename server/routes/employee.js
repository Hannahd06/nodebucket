/**
 * Title: employees.js
 * Author: Professor Krasso
 * Modified by: Hannah Del Real
 * Date: 01/22/24
 */

"use strict";

const express = require('express');
const router = express.Router();
const { mongo } =  require('../utils/mongo');
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');

// Generate an instance of Ajv
const ajv = new Ajv();

// Category schema for color
const categorySchema = {
  type: 'object',
  properties: {
    categoryTitle: { type: 'string' },
    categoryColor: {type: 'string' }
  },
  required: ['categoryTitle', 'categoryColor'],
  additionalProperties: false
}

// ajv schema validation
const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    category: categorySchema
  },
  required: ['text', 'category'],
  additionalProperties: false
}

// tasks schema for validation
const tasksSchema = {
  type: 'object',
  required: ['todo', 'done'],
  additionalProperties: false,
  properties: {
    todo: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          text: { type: 'string' },
          category: categorySchema
        },
        required: ['_id','text', 'category'],
        additionalProperties: false
      }
    },
    done: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          text: { type: 'string' },
          category: categorySchema
        },
        required: ['_id','text', 'category'],
        additionalProperties: false
      }
    },
  }
}





// findEmployeeById

router.get("/:empId", (req, res, next) => {
  try {
    let { empId } = req.params;
    empId =  parseInt(empId, 10);

// Check if user input is a numerical value
    if (isNaN(empId)) {
      const err = new Error('Employee ID must be a number.');
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }

    // Check if user input matches empId in database
    mongo(async db => {
      const employee = await db.collection("employees").findOne({empId});

      // If user input does not match database send error message
      if (!employee) {
        const err = new Error("Unable to find employee with empId" + empId);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

     // If input matches return employee document
      res.send(employee);
    });

  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
});

// findAllTasks

router.get("/:empId/tasks", (req, res, next) => {
  try {
    let { empId } = req.params;
    empId =  parseInt(empId, 10);

    // Check if user input is a numerical value
    if (isNaN(empId)) {
      const err = new Error('Employee ID must be a number.');
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }

    // Search database for matching empId
    mongo(async db => {
       const tasks = await db.collection('employees').findOne(
        { empId },
        { projection: { empId: 1, todo: 1, done: 1 } }
      )

      // If empId does not match any employee in database return 404 error

      if (!tasks) {

          const err = new Error("Unable to find tasks for empId" + empId);
          err.status = 404;
          console.log("err", err);
          next(err);
          return;
       }
       // If empId matches, return empId and tasks
       res.send(tasks);
   }, next )

  } catch (err) {
    console.error("err", err);
    next(err);
  }
}
);



// createTasks
router.post("/:empId/tasks", (req, res, next) => {
  try {
    let { empId } = req.params;
    empId =  parseInt(empId, 10);

    // Check if user input is a numerical value

    if (isNaN(empId)) {
      const err = new Error('Input must be a number.');
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }

    // Search database for matching empId
    mongo(async db => {
      const employee = await db.collection('employees').findOne({empId});
        if (!employee) {
          const err = new Error('Unable to find employee with empId.' + empId);
          err.status = 404;
          console.log("err", err);
          next(err);
          return;
        }



        //req.body validation
        const { text } = req.body;
        const validator = ajv.compile(taskSchema);
        const isValid =  validator(text);

        // If the user input does not pass validation, return 400 error
        if (!isValid) {
          const err = new Error('Bad Request');
          err.status = 400;
          err.errors = validator.errors;
          console.log('req.body validation failed', err)
          next(err);
          return;
        }
        // Create task object
        const task = {
          _id: new ObjectId(),
          text: text.text,
          category: text.category
        }
        // push new task object to the empId's todo tasks object
        const result = await db.collection('employees').updateOne(
          {empId},
          {$push: { todo: task }}
        )

        // If a task is not added, return 500 error
        if (!result.modifiedCount) {
          const err =  new Error('Unable to create task for empId' + empId);
          err.status = 500;
          console.log("err", err);
          next(err);
          return;
        }

        // if a new task is successfully created, return _id
        res.status(201).send( { id:task._id })
      }, next)
  } catch (err) {
    console.err('err', err);
    next(err);
  }
});

//updateTask
router.put("/:empId/tasks", (req, res, next) => {
  try {
    let { empId } = req.params;
    empId =  parseInt(empId, 10);

    // Check if user input is a numerical value
    if (isNaN(empId)) {
      const err = new Error('Input must be a number.');
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }



    mongo(async db => {
      // search database to see if user input for empId matches any empId in database
      const employee = await db.collection('employees').findOne({ empId });

      // If no empIds match, return 404 error
      if (!employee) {
        const err = new Error('Unable to find employee with empID' + empId);
        err.status = 404;
        next(err);
        return;
      }
      // set up validator to set format as tasksSchema
      const validator = ajv.compile(tasksSchema);
      // Validate that user input matches format of tasksSchema
      const isValid =  validator(req.body);

      // If the user input does not pass validation, return 400 error
      if (!isValid) {
        const err = new Error('Bad Request');
        err.status = 400;
        err.errors = validator.errors;
        console.log('req.body validation failed', err)
        next(err);
        return;
      }

      // update todo and done lists for empId
      const result = await db.collection('employees').updateOne(
            { empId },
            {$set: { todo: req.body.todo, done: req.body.done } }
      )

      console.log(result);

      // If neither list is updated, return 404 error
     if (!result.modifiedCount) {
      const err = new Error('Unable to update task for empId' + empId);
      err.status = 404;
      console.error('err', err);
      next(err);
      return;
      }

      res.status(204).send();
      }, next);

  } catch(err) {
    console.error("err", err);
    next(err);
  }
})


// deleteTask
router.delete("/:empId/tasks/:taskId", (req, res, next) => {
  try{
    // obtain taskId end empId from user input
    let { empId, taskId } = req.params;
    empId =  parseInt(empId, 10);
    console.log('empId', empId);

    // Check if user input is a numerical value
    if (isNaN(empId)) {
      const err = new Error('Input must be a number.');
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }

    mongo (async db => {

      // Search employee database from user input value provided in empId variable
      let employee = await db.collection('employees').findOne({empId});

      // If empId does not match any empId value in database, return 404 error
      if (!employee) {
        const err = new Error('Unable to find employee with empID' + empId);
        err.status = 404;
        next(err);
        return;
      }

      // If the taskId in todo for empId does not match, return todo array for empId
      if (!employee.todo) {
        employee.todo= [];
      }

      // If the taskId in done for empId does not match, return todo array for empId
      if (!employee.done) {
        employee.done =[];
      }
      /** Filter through task and done lists to for taskId obtained from user input
       * Deletes any taskId that matches
       */

      const todo = employee.todo.filter(task => task._id.toString() !== taskId.toString());
      const done = employee.done.filter(task => task._id.toString() !== taskId.toString()) ;

      // Return updated todo and done lists
      const result = await db.collection('employees').updateOne(
        {empId},
        {$set: {todo: todo, done: done}}
      )
      res.status(204).send();
    }, next);


  } catch(err) {
    console.error("err", err);
    next(err);
  }
}
)




module.exports = router;
