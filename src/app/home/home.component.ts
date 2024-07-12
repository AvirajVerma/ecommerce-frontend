import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  productDetails: Product[] = [];
  showLoadButton = false;
  value = '';
  currentFilter = '';

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService,
              private router: Router,
              private cartService: CartServiceService,
              private snackBar: MatSnackBar
        ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = "", filter: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey, filter)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe({
        next: (resp: Product[]) => {
          if (resp.length === 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          console.log(resp);
          if (this.pageNumber === 0) {
            this.productDetails = resp;
          } else {
            resp.forEach(p => this.productDetails.push(p));
          }
        },
        error: (error: HttpHeaderResponse) => {
          console.log(error);
        }
      });
  }

  showProductDetails(productId: number | any) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts(this.value, this.currentFilter);
  }

  searchBykeyword(searchKeyword: any) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.value = searchKeyword;
    this.getAllProducts(searchKeyword, this.currentFilter);
  }

  removeAllLetters() {
    this.value = '';
    this.pageNumber = 0;
    this.getAllProducts();
  }

  public filterProducts(filter: string) {
    this.currentFilter = filter;
    this.pageNumber = 0;
    this.getAllProducts(this.value, filter);
  }

  addToCart(productId: number | any, event: Event){
    event.stopPropagation();
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

  openSnackBar() {
    let snackBarRef = this.snackBar.open('Product added to cart', 'Go to Cart', {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
}
