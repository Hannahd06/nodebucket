/**
 * Title: security.service.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 01/17/24
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  findEmployeeById(empId: number) {
    // return employee document for corresponding empId
    return this.http.get('/api/employees/' + empId);
  }
}
