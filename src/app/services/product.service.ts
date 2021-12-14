import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServerResponse, ProductModelServer } from '../models/product.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + 'products');
  }

  getProductsByType(tenlsp: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      this.SERVER_URL + 'products/loaisanpham/' + tenlsp
    );
  }

  getProductsByTradeMark(tenth: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      this.SERVER_URL + 'products/loaithuonghieu/' + tenth
    );
  }

  getSingleProduct(masp: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(
      this.SERVER_URL + 'products/' + masp
    );
  }

  filterProduct(value: any): any {
    this.http
      .post(`${this.SERVER_URL}products/filter`, {
        arrFilter: value,
      })
      .subscribe((data: any) => {
        if (data.count === 0) {
          alert(
            'Không sản phẩm phù hợp với lựa chọn của bạn. Vui lòng lựa chọn khác'
          );
        } else {
          localStorage.setItem('filter', JSON.stringify(data));
          window.location.href = 'http://localhost:4200/products/filterData';
        }
      });
  }
}
