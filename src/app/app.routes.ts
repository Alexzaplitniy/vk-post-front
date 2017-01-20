import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';

export const Routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**', redirectTo: ''
  }
]);
