import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from '@layouts/auth-layout/auth-layout';
import { Error404Alt } from '@/app/views/error/error-404-alt';
import { Error500 } from '@/app/views/error/error-500';
import { Landing } from '@/app/views/landing/landing';
import { authGuard } from '@/app/core/services/auth/auth-guard';

export const routes: Routes = [
  // 1️⃣ redirect iniziale
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // 2️⃣ AUTH (libero)
  {
    path: '',
    component: AuthLayout,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },

  // 3️⃣ AREA PROTETTA 🔒
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],   // 👈 QUESTO È IL PUNTO CHIAVE
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./myviews/myviews.route').then((m) => m.MYVIEWS_ROUTES),
      },
    ],
  },

  // 4️⃣ varie
  {
    path: 'error/404-2',
    component: Error404Alt,
  },
  {
    path: 'error/500',
    component: Error500,
  },
  {
    path: 'landing',
    component: Landing,
  },
];
