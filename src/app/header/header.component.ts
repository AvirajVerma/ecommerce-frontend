import { Subscription } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartLength: number = 0;
  userFirstName: string | null = '';
  private userFirstNameSubscription: Subscription | undefined;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private cartService: CartServiceService
  ){}

  ngOnInit(): void {
    this.cartService.cartLength$.subscribe(length => {
      this.cartLength = length;
    });

    this.userFirstNameSubscription = this.userAuthService.userFirstName$.subscribe(firstName => {
      this.userFirstName = firstName;
    });
    
    this.userFirstName = this.userAuthService.getUserFirstName();
  }

  ngOnDestroy(): void {
    if (this.userFirstNameSubscription) {
      this.userFirstNameSubscription.unsubscribe();
    }
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isVendor(){
    return this.userAuthService.isVendor();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  updateUserDetails(){
    this.router.navigate(['/register']);
  }
}
