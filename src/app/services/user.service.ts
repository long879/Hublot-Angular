import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  loginUser(data: any) {
    this.http
      .post<any>(this.SERVER_URL + 'users/login', data)
      .subscribe((data) => {
        if (data.success) {
          localStorage.setItem('idAccount', JSON.stringify(data.matk));
          var r = confirm(
            'Bạn đã đăng nhập thành công!\nNhấn Ok để đi đến trang sản phẩm hoặc nhấn Cancel để đi trang thông tin cá nhân.'
          );
          if (r == true) {
            window.location.href = 'http://localhost:4200/products';
          } else {
            window.location.href = 'http://localhost:4200/profile';
          }
        } else {
          alert(data.message);
        }
      });
  }

  registerUser(data: any) {
    this.http
      .post<any>(this.SERVER_URL + 'users/register', data)
      .subscribe((data) => {
        if (data.success) {
          alert('Bạn đã đăng ký thành công. Hãy đăng nhập ngay nào!');
        } else {
          alert(data.message);
        }
      });
  }

  getNameAccount(id: number) {
    return this.http.get(this.SERVER_URL + 'users/getNameAccount/' + id);
  }

  changePassword(data: any, nameAccount: string) {
    this.http
      .post<any>(this.SERVER_URL + 'users/changepassword', {
        data,
        nameAccount,
      })
      .subscribe((data) => {
        if (data.success) {
          alert('Bạn đã thay đổi mật khẩu thành công!');
        } else {
          alert(data.message);
        }
      });
  }
}
