import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: any = '';

  productDetails: Product[] = [];

  

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  }


  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity: 1}
      )
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      {
        next:
        (resp: any) => {
          console.log(resp);
          orderForm.reset();
          this.router.navigate(["/orderConfirm"]);
        },
        error:
        (err) =>{
          console.log(err);
        }
      }
    );
  }

  getQuantityForProduct(productId: number | any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number |any, productDiscountedPrice: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(qty: any, productId: any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = qty;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal += price * productQuantity.quantity; 
      }
    );

    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm : NgForm){
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe({
      next: (resp) =>{
        console.log(resp);
        this.openTransactionModal(resp, orderForm)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openTransactionModal(response: any, orderForm : NgForm){
    let options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'SkoopCell',
      description: 'Payment for placing your Order',
      // image: 'https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=1024x1024&w=is&k=20&c=Gsr6lZkBHjjeP5o18w9_mvnWxMZBqB-ncOi6tqh87hM=',
      handler: (response: any) =>{
        if(response != null && response.razorpay_payment_id != null){
          this.processResponse(response, orderForm);

        }else{
          alert("Payment has Failed")
        }
      },
      prefill: {
        name: 'Aviraj',
        email: 'avirajc@gmail.com',
        contact: '7302221721'
      },
      notes:{
        address: 'Dwarka, Delhi'
      },
      theme: {
        color: '#fca311'
      }
    }
    let razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm : NgForm){
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm)
  }
}
