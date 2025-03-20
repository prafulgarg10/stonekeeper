import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appService: AppService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: any):boolean{
    if(this.isLoggedIn()){
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

  isLoggedIn():boolean{
    return this.appService.loggedInUser.value.Username!='None';
  }
}
