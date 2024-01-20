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