/**
 * Title: signin.component.ts
 * Author: Professor Krasso
 * Modified by Hannah Del Real
 * Date: 01/17/14
 */

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from '../security.service';

export interface SessionUser {
  empId: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  errorMessage: string;
  sessionUser: SessionUser;
  isLoading: boolean = false;

  signinForm = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
    this.sessionUser = {} as SessionUser; // Initialize a session user object
    this.errorMessage =''; // Initialize an error message
  }

  signin() {
    this.isLoading = true;
    console.log("signinForm", this.signinForm.value);
    const empId = this.signinForm.controls['empId'].value; // Get empId value from input provided in signin Form

    if (!empId || isNaN(parseInt(empId, 10))) {
      this.errorMessage = 'The employee ID is invalid! Please enter a number.'; // Error message to indicate employee ID must be a numerical value
      this.isLoading = false; // Disable isLoading
      return;
    }

    this.securityService.findEmployeeById(empId).subscribe({
      next: (employee: any) => {
        console.log('employee', employee);

        this.sessionUser = employee;
        // Set the cookie for session_user to corresponding empId
        this.cookieService.set('session_user', empId, 1);
        // Set the cookie for session_user to employee's first and last name for corresponding empId
        this.cookieService.set('session_name', `${employee.firstName} ${employee.lastName}`, 1);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

        this.isLoading = false;
        this.router.navigate([returnUrl]);

      },
      error: (err) => {
        this.isLoading = false;
        if (err.error.message) {
          this.errorMessage = err.error.message;
          return;
        }
        this.errorMessage = err.message;
      }
    });
  }
}
