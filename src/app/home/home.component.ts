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

  pageNumber: number = 0;

  productDetails: Product[] = [];

  showLoadButton = false;

  value = '';

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = ""){
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) =>x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe({
      next:
      (resp: Product[]) => {
        if(resp.length == 12){
          this.showLoadButton = true;
        }else{
          this.showLoadButton = false;
        }
        console.log(resp);
        resp.forEach(p => this.productDetails.push(p));
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

  public loadMoreProduct(){
    this.pageNumber = this.pageNumber+1;
    this.getAllProducts();
  }

  searchBykeyword(searchKeyword: any){
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

  removeAllLetters(){
    this.value = '';
    this.productDetails = [];
    this.getAllProducts();
  }
}
