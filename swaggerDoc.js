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
