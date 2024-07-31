import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUs } from '../_model/contact-us.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private userService: UserService){}

  ngOnInit(): void {}

  contactUs: ContactUs = {
    fullName: "",
    email: "",
    message: ""
  }

  openMap() {
    window.open('https://www.google.com/maps/place/SkoopCell/@30.7412079,76.7156544,13z/data=!4m12!1m5!8m4!1e4!2s118283492979851579904!3m1!1e1!3m5!1s0x390fed00041ccdfb:0xf37f04cb2d4b8ce4!8m2!3d30.735369!4d76.7774332!16s%2Fg%2F11w34g8gk9?entry=ttu');
  }

  callPhone() {
    window.location.href = 'tel:7302221721';
  }

  sendEmail() {
    window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJlHmgMNfmhztjDzqDBjbNzQgKVPkHNMkhNTVmtvZSTVmtlhKmvFgdBZlGCtcPBvZLLNtlB')
  }

  newContactUs(contactForm: NgForm){
    this.userService.newContactUs(contactForm.value).subscribe({
      next: (resp) => {
        alert("Message sent succefully!")
        contactForm.resetForm();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
