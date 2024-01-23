"use strict";

const express = require('express');
const router = express.Router();
const { mongo } =  require('../utils/mongo');
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');

const ajv = new Ajv();

// ajv schema validation
const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    category: { type: 'string' }
  },
  required: ['text', 'category'],
  additionalProperties: false
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

    // check if user input matches empId in database
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

    mongo(async db => {
       const tasks = await db.collection('employees').findOne(
        { empId },
        { projection: { empId: 1, todo: 1, done: 1 } }
      )

      if (!tasks) {

          const err = new Error("Unable to find tasks for empId" + empId);
          err.status = 404;
          console.log("err", err);
          next(err);
          return;
       }

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

        if (!isValid) {
          const err = new Error('Bad Request');
          err.status = 400;
          err.errors = validator.errors;
          console.log('req.body validation failed', err)
          next(err);
          return;
        }

        const task = {
          _id: new ObjectId(),
          text: text.text,
          category: text.category
        }

        const result = await db.collection('employees').updateOne(
          {empId},
          {$push: { todo: task }}
        )

        if (!result.modifiedCount) {
          const err =  new Error('Unable to create task for empId' + empId);
          err.status = 500;
          console.log("err", err);
          next(err);
          return;
        }

        res.status(201).send( { id:task._id })
      }, next)
  } catch (err) {
    console.err('err', err);
    next(err);
  }
})




module.exports = router;
