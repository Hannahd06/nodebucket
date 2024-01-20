"use strict";

const express = require('express');
const router = express.Router();
const { mongo } =  require('../utils/mongo');

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
})

module.exports = router;