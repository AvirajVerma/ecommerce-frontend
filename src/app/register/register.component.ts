import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { User } from '../_model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  user: User = {
    userName: "",
    userFirstName: "",
    userLastName: "",
    userPassword: "",
    role: []
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.userService.getUserDetailsByUserName().subscribe({
        next: (resp: User) => {
          this.user = { ...resp, userPassword: "" };
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  register(registerForm: NgForm) {
    if (this.isLoggedIn()) {
      this.userService.updateUserPassword(this.user.userName, registerForm.value.userPassword).subscribe({
        next: (resp) => {
          alert('Password updated successfully');
          this.router.navigate(['/']);
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      // Handle new user registration
      this.userService.register(registerForm.value).subscribe({
        next: (resp) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  public isLoggedIn(): any {
    return this.userAuthService.isLoggedIn();
  }
}
