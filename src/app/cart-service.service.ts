import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartLength$: Observable<number> = this.cartLengthSubject.asObservable();

  constructor(private productService: ProductService) {
    this.updateCartLength();
  }

  updateCartLength(): void {
    this.productService.getCartDetails().subscribe({
      next: (resp: any) => {
        this.cartLengthSubject.next(resp.length);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
