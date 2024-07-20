import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from './_model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolveService {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return of(this.getUserDetailsByUserName());
  }

  getUserDetailsByUserName(){
    return{
      userName: "",
      userFirstName: "",
      userLastName: "",
      userPassword: "",
      role: []
    }
  }
}
