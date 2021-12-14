import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationExtras, Router } from '@angular/router';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { ProductModelServer } from '../models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartModelPublic, CartModelServer } from '../models/cart.model';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  SERVER_URL = environment.SERVER_URL;

  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{ id: 0, incart: 0 }],
  };

  private cartDataServer: CartModelServer = {
    total: 0,
    data: [
      {
        //@ts-ignore
        product: undefined,
        numInCart: 0,
      },
    ],
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);
    //@ts-ignore
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      this.cartDataClient = info;
      this.cartDataClient.prodData.forEach((p: any) => {
        this.productService
          .getSingleProduct(p.id)
          .subscribe((actualProductInfo: ProductModelServer) => {
            if (this.cartDataServer.data[0].numInCart === 0) {
              this.cartDataServer.data[0].numInCart = p.incart;
              this.cartDataServer.data[0].product = actualProductInfo;
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                product: actualProductInfo,
                numInCart: p.incart,
              });
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({ ...this.cartDataServer });
          });
      });
    }
  }

  CalculateSubTotal(index: number): number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.dongia * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: number, soluong?: number) {
    this.productService.getSingleProduct(id).subscribe((prod: any) => {
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart =
          soluong !== undefined ? soluong : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart =
          this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.masp;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.toast.success(
          `${prod.tensp} đã thêm vào giỏ hàng.`,
          'Thêm sản phẩm vào giỏ hàng',
          {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          }
        );
      }
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(
          (p: any) => p.product.masp === prod.masp
        );

        // 1. If chosen product is already in cart array

        // Plus: cộng thêm với đã có trong giỏ hàng phải <= prod.soluong
        if (index !== -1) {
          if (soluong !== undefined) {
            let soSanPhamTrongGio = this.cartDataServer.data[index].numInCart;
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart + soluong < prod.soluong
                ? Number(soluong) + Number(soSanPhamTrongGio)
                : prod.soluong;
          } else {
            this.cartDataServer.data[index].numInCart < prod.soluong
              ? this.cartDataServer.data[index].numInCart++
              : prod.soluong;
          }

          this.cartDataClient.prodData[index].incart =
            this.cartDataServer.data[index].numInCart;

          this.toast.info(
            `${prod.tensp} đã cập nhật số lượng sản phẩm trong giỏ hàng.`,
            'Cập nhật giỏ hàng',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1,
          });

          this.cartDataClient.prodData.push({
            id: prod.masp,
            incart: 1,
          });

          this.toast.success(
            `${prod.tensp} đã thêm vào giỏ hàng.`,
            'Thêm sản phẩm vào giỏ hàng',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    });
  }

  UpdateCartData(index: number, increase: boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.soluong
        ? data.numInCart++
        : data.product.soluong;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObs$.next({ ...this.cartDataServer });
    } else {
      data.numInCart--;

      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index: number) {
    if (window.confirm('Bạn có muốn xóa sản phẩm này không?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { total: 0, prodData: [{ incart: 0, id: 0 }] };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          total: 0,
          data: [
            {
              //@ts-ignore
              product: undefined,
              numInCart: 0,
            },
          ],
        };
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }

  private CalculateTotal() {
    let Total = 0;
    this.cartDataServer.data.forEach((p: any) => {
      const { numInCart } = p;
      const { dongia } = p.product;

      Total += numInCart * dongia;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  CheckoutFromCart(accountId: number) {
    this.http
      .post(`${this.SERVER_URL}orders/payment`, null)
      .subscribe((res: any) => {
        if (res.success) {
          this.resetServerData();
          this.http
            .post(`${this.SERVER_URL}orders/new`, {
              accountId: accountId,
              total: this.cartDataClient.total,
              products: this.cartDataClient.prodData,
            })
            .subscribe((data: any) => {
              this.cartDataClient = {
                total: 0,
                prodData: [{ id: 0, incart: 0 }],
              };
              this.cartTotal$.next(0);
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              this.toast.success(
                'Đơn hàng đã được lưu lại. Xin cám ơn quý khách!',
                'Tình trạng thanh toán',
                {
                  timeOut: 1500,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right',
                }
              );
            });
        } else {
          this.toast.error(
            'Xin lỗi. Đã có lỗi trong quá trình thanh toán',
            'Tình trạng thanh toán',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
      });
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [
        {
          //@ts-ignore
          product: undefined,
          numInCart: 0,
        },
      ],
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }
}
