import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  sendEmail(data: any) {
    this.http.post(this.SERVER_URL + 'emails', data).subscribe((data: any) => {
      if (data.success) {
        alert('Đã xác nhận email của bạn! Xin cám ơn bạn đã quan tâm!');
      } else {
        alert('Đã có lỗi trong quá trình xử lý!');
      }
    });
  }
}
