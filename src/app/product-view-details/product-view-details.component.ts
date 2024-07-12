import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { CartServiceService } from '../cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  
  product: Product | any;
  selectedProductIndex = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartServiceService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  addToCart(productId: number | any){
    console.log(productId);

    this.productService.addToCart(productId).subscribe(
      {
        next:
        (resp) => {
          console.log(resp);
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

  changeIndex(index: number){
    this.selectedProductIndex = index
  }

  buyProduct(productId: number){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }

  openSnackBar() {
    let snackBarRef = this.snackBar.open('Product added to cart', 'Go to Cart', {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
}
