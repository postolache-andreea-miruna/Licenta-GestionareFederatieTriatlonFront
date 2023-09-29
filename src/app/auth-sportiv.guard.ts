import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSportivGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(localStorage.getItem('RoleId'), localStorage.getItem('RoleId') === 'SportivUtilizator');
    const isAuthorized = localStorage.getItem('RoleId') === 'SportivUtilizator';
    if(!isAuthorized){
      this.router.navigate(['/home']);
    }
    return isAuthorized;
  }
  
}
