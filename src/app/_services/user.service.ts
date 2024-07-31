import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, tap } from 'rxjs';
import { User } from '../_model/user.model';
import { ContactUs } from '../_model/contact-us.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090"

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) { }


  public login(loginData: any){
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader})
      .pipe(
        tap((response: any) => {
          this.userAuthService.setUserFirstName(response.user.userFirstName);
        })
      );
  }

  public forUser(){
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text'});
  }

  public forAdmin(){
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text'});
  }

  public forVendor(){
    return this.httpclient.get(this.PATH_OF_API + '/forVendor', {
      responseType: 'text'});
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles.length) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

  register(user: User): Observable<User> {
    return this.httpclient.post<User>(`${this.PATH_OF_API}/registerNewUser`, user);
  }

  updateUserPassword(userName: string, newPassword: string): Observable<any> {
    return this.httpclient.put(`${this.PATH_OF_API}/${userName}/password`, { newPassword });
  }

  public getUserDetailsByUserName(): Observable<User> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.httpclient.get<User>(`${this.PATH_OF_API}/getUserDetailsByUserName`, { headers });
  }

  newContactUs(contactUs: ContactUs): Observable<ContactUs>{
    return this.httpclient.post<ContactUs>(`${this.PATH_OF_API}/newContactUs`, contactUs);
  }
}
