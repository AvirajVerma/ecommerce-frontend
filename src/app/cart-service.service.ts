import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './_services/product.service';
import { UserAuthService } from './_services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartLength$: Observable<number> = this.cartLengthSubject.asObservable();

  constructor(private productService: ProductService, private userAuthService: UserAuthService) {
    this.updateCartLength();
  }

  updateCartLength(): void {
    const roles = this.userAuthService.getRoles();
    const isUser = roles.some((role: any) => role.roleName === 'User');

    if (isUser) {
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
}
