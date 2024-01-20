/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Modified by: Hannah Del Real
 * Date: 01/17/24
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
