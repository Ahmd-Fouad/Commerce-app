import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if(cookieService.get('token')) {
    return router.parseUrl('/home')
  } else {
    return true
  }
};
