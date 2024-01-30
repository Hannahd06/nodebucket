/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Modified by: Hannah Del Real
 * Date: 01/17/24
 */

/**
 * @openapi
 * tags:
 *   name: Employees
 */

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning a single employee object from MongoDB
 *     summary: Returns an employee document
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The empId requested by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

/**
 * findAllTasks
 * @openapi
 * /api/employees/{empId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API to find all tasks by empId
 *     summary: Returns task documents for an empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The team empId inputted by the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of task documents returned
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid empId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */



/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     description: API for adding a new task to todo list by empId
 *     summary: Creates a todo task for empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: The empId inputted by the user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                   category:
 *                     type: object
 *                     properties:
 *                       categoryTitle:
 *                         type: string
 *                         description: Category titles
 *                       categoryColor:
 *                         type: string
 *                         description: Colors associated with category titles
 *             required:
 *               - text
 *
 *     responses:
 *       '201':
 *         description: New Task created
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Invalid empId
 *       '500':
 *         description: Server Exception
 */

/**
 * updateTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     name: updateTask
 *     description: API for updating tasks for an employee document in MongoDB.
 *     summary: Updates task for an empId
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId of the user.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: todo and done lists with tasks to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     text:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         categoryTitle:
 *                           type: string
 *                           description: Category titles
 *                         categoryColor:
 *                           type: string
 *                           description: Colors associated with category titles
 *               done:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     text:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         categoryTitle:
 *                           type: string
 *                           description: Category titles
 *                         categoryColor:
 *                           type: string
 *                           description: Colors associated with category titles *
 *     responses:
 *       '204':
 *         description: Updated tasks
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Server Exception
 */

/**
 * deleteTask
 * @openapi
 * /api/employees/{empId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     name: deleteTask
 *     description: API for deleting a task empId from MongoDB.
 *     summary: Removes a task from and employee ID's task list in MongoDB.
 *     parameters:
 *       - name: empId
 *         in: path
 *         required: true
 *         description: empId for user.
 *         schema:
 *             type: integer
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: _id for task you want to delete.
 *         schema:
 *             type: string
 *     responses:
 *       '204':
 *         description: task deleted
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Exception
 */