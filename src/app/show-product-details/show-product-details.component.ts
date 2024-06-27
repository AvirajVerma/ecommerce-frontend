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
  
  pageNumber: number = 0;
  showTable = false;
  showLoadMoreProductButton = false;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'product_name', 'description', 'product_actual_price', 'product_discounted_price', 'Action'];
  
  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { } 

  ngOnInit(): void {
    this.getAllProducts();

  }

  searchBykeyword(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);

  }

  public getAllProducts(searchKeyword: string = ""){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber,searchKeyword)
    .pipe(
      map((x: Product[], i) =>x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe({
      next:
      (resp: Product[]) => {
        console.log(resp);
        // this.productDetails = resp;
        resp.forEach(product => this.productDetails.push(product));
        this.showTable = true;

        if(resp.length == 12){
          this.showLoadMoreProductButton = true;
        }else{
          this.showLoadMoreProductButton = false;
        }

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

  loadMoreProdcuts(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  toggleDescription(element: any) {
    element.showFullDescription = !element.showFullDescription;
  }
}
