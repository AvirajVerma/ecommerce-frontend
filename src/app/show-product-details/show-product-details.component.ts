import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'product_name', 'description', 'Product Actual Price', 'Product Discounted Price', 'Action'];
  
  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { } 

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

  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe({
      next:
      (resp) => {
        this.getAllProducts();
      },
      error:
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '600px'
    });
  }

  editProductDetails(productId: number | any){
    this.router.navigate(['/addNewProduct', {productId: productId}])
  }
}
