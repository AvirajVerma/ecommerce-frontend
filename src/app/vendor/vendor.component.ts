import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  
  message: string | any;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.forVendor();
  }

  forVendor() {
    this.userService.forVendor().subscribe({
      next: (response) => {
        console.log(response);
        this.message = response;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}