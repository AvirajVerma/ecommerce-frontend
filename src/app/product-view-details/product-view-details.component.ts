import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { CartServiceService } from '../cart-service.service';

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
    private cartService: CartServiceService
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
}
