import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData!: CartModelServer;
  cartTotal: number = 0;
  subTotal: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.initCartService();
  }

  initCartService(): void {
    this.cartService.cartDataObs$.subscribe(
      (data: CartModelServer) => (this.cartData = data)
    );
    this.cartService.cartTotal$.subscribe((total) => (this.cartTotal = total));
  }

  ChangeQuantity(id: number, increaseQuantity: boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

  CheckoutFromCart() {
    //@ts-ignore
    let idAccount: number = JSON.parse(localStorage.getItem('idAccount'));

    if (idAccount !== null && idAccount !== undefined && idAccount !== 0) {
      this.cartService.CheckoutFromCart(idAccount);
    } else {
      var r = confirm(
        'Bạn cần đăng nhập mới có thể thanh toán!\nNhấn Ok để đi đến trang đăng nhập.'
      );
      if (r == true) {
        window.location.href = 'http://localhost:4200/account';
      }
    }
  }
}
