import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Item', 'Price', 'Action'];

  cartDetails: any[] = [];

  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartServiceService,
    private snackBar: MatSnackBar
  ){}
  
  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: number){
    this.productService.deleteCartItem(cartId).subscribe(
      {
        next:
        (resp) => {
          console.log(resp);
          this.getCartDetails();
          this.cartService.updateCartLength();
          this.openSnackBar();
        },
        error:
        (err) => {
          console.log(err);
        }
      }
    );
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      {
        next:
        (resp: any) => {
          console.log(resp);
          this.cartDetails = resp;
        },
        error:
        (err) => {
          console.log(err);
        }
      }
    );
  }

  checkout(){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
  }

  toggleDescription(element: any) {
    element.showFullDescription = !element.showFullDescription;
  }

  openSnackBar() {
    let snackBarRef = this.snackBar.open('Product deleted from cart', 'Close', {duration: 3000});
  }
}
