import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  
  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];

  dataSource = [];
  status: string = 'all';

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParam: string) {
    this.status = statusParam;
    this.productService.getAllOrderDetailsForAdmin(statusParam).subscribe({
      next:
      (resp: any) => {
        this.dataSource = resp;
        console.log(resp);
      }, 
      error:
      (error) => {
        console.log(error);
      }
  });
  }

  markAsDelivered(orderId: any){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe({
      next:
      (resp) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(resp);
      }, 
      error:
      (error) => {
        console.log(error);
      }
    });
  }


}
