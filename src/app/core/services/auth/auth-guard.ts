import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@/app/core/services/session.service';

export const authGuard: CanActivateFn = () => {

  const session = inject(SessionService);
  const router = inject(Router);

  // 🔐 se l'utente è loggato → ok
  if (session.isLoggedIn()) {
    return true;
  }

  // ❌ non loggato → redirect al login
  router.navigate(['/auth/login']);
  return false;
};
