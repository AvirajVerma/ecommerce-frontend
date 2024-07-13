import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private userFirstNameSubject = new BehaviorSubject<string | null>(this.getUserFirstName());
  public userFirstName$ = this.userFirstNameSubject.asObservable();

  constructor() { }

  public setRoles(roles:[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }
  
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken", jwtToken);
  }

   public getToken() : string | null{
    return localStorage.getItem("jwtToken");
   }

  public setUserFirstName(firstName: string){
    localStorage.setItem("userFirstName", firstName);
    this.userFirstNameSubject.next(firstName);
  }

  public getUserFirstName() : string | null{
    return localStorage.getItem("userFirstName");
  }

   public clear(){
    localStorage.clear();
    this.userFirstNameSubject.next(null);
   }

   public isLoggedIn(){
    return this.getRoles() && this.getToken();
   }

   public isVendor(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Vendor';
   }

   public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
   }

   public isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
   }
}
