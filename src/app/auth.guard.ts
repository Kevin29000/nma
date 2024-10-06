import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { UserLoginService } from './userLogin.service';

export const authGuard: CanActivateFn = () => {
  
  //const authService = inject(AuthService); // Remplace le constructeur car on ne peut plus en avoir dans un guard
  const userLoginService = inject(UserLoginService);
  const router = inject(Router);

  //if(authService.isLoggedIn) { // Comme c'est un boolean pas besoin de mettre == true
    //return true;
  //}

  if(userLoginService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
