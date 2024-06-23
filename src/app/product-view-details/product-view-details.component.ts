import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  
  product: Product | any;
  selectedProductIndex = 0;
  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number){
    this.selectedProductIndex = index
  }

}
