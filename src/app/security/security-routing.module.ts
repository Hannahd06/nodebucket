/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Modified by Hannah Del Real
 * Date: 01/17/14
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Route to sign in page
const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'Nodebucket: Sign In'
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
        title: '404 Error'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
