import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit{
  constructor(private cartService: CartServiceService){

  }
  
  ngOnInit(): void {
    this.cartService.updateCartLength();
  }

}
