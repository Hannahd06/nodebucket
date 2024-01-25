/**
 * Title: employee.interface.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 01/24/24
 */

import { Item } from './item.interface'
export interface Employee {
  empId: number;
  todo: Item[];
  done: Item[];
}
