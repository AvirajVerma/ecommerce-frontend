import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginError: string = '';
  formError: string = '';
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.formError = '';

    if (loginForm.invalid) {
      this.formError = 'Please fill out all required fields.';
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        // console.log(response.jwtToken);
        // console.log(response.user.role);

        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        }
        else if(role === 'Vendor') {
          this.router.navigate(['/']);
        }
        
        else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.loginError = 'Invalid username or password.';
        console.log(error);
      }
    });
  }

  registerUser(){
    this.router.navigate(['/register']);
  }
}
