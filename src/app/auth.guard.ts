import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentifService } from './services/authentif.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthentifService, private router : Router){ }//avem nev si de autentificare s de rutare pt ca il redirectionam 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.isLoggedIn()){//daca nu e logat il redirectionam spre login
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    
  }
  
}
