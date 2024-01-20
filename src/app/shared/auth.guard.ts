/**
 * Title: auth-guard.ts
 * Author: Professor Krasso
 * modified by: Hannah Del Real
 * Date: 01/17/24
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject CookieService.
  const cookie = inject(CookieService);

  if (cookie.get('session_user')) {
    console.log('User is logged in and can now access the Task page.')
    return true;
  } else {
    console.log('User is not logged in and cannot access the Task page')
    const router = inject(Router);
    router.navigate(['/security/signin'], { queryParams: {returnUrl: state.url} })
    return false;
  }
};
