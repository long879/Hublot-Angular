import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ServerOrderResponse,
  ServerOrderDetailResponse,
  OrderDetailModelServer,
} from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  getSingleOrder(orderId: Number) {
    return this.http
      .get<OrderDetailModelServer[]>(`${this.SERVER_URL}orders/${orderId}`)
      .toPromise();
  }

  getAllOrderPerson(makh: number) {
    return this.http.get<any>(
      this.SERVER_URL + 'orders/ordersofperson/' + makh
    );
  }

  getSingleOrderDetail(madh: number) {
    return this.http.get<any>(
      this.SERVER_URL + 'orders/orderdetailofperson/' + madh
    );
  }
}
