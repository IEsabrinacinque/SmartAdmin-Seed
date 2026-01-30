import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const MYVIEWS_ROUTES: Routes = [
  {
    path: 'myviews/dashboard',
    component: Dashboard,
    data: { title: 'My Dashboard' },
  },
];