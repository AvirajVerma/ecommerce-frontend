import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productDetails: Product[] = [];

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllProducts();

  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) =>x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe({
      next:
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;
      },
      error:
      (error: HttpHeaderResponse) => {
        console.log(error);
      }
  });
  }

  showProductDetails(productId: number|any){
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
}
