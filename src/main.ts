/**
 * Title: main.ts
 * Author: Professor Krasso
 * Modifed by: Hannah Del Real
 * Date: 01/17/24
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
