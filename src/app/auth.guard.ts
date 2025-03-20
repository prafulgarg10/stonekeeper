import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';


export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivate(route, state);
};
