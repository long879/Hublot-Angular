import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  idAccount!: number;
  nameAccount: any;
  clickHistory: boolean = true;
  clickChangePassword: boolean = false;
  formChangePassword!: any;
  submittedChangePassword: boolean = false;
  tatCaDonHang: any[] = [];
  danhSachChiTiet: any[] = [];
  watchAll: boolean = true;
  watchDetail: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    //@ts-ignore
    this.idAccount = JSON.parse(localStorage.getItem('idAccount'));
    this.userService.getNameAccount(this.idAccount).subscribe((data: any) => {
      this.nameAccount = data['user'].tendangnhap;
    });
    this.formChangePassword = this.fb.group({
      passwordCurrent: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      passwordNew: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }

  ngOnInit(): void {
    this.getAllOrderPerson();
  }

  getAllOrderPerson() {
    this.orderService
      .getAllOrderPerson(this.idAccount)
      .subscribe((arrayOrders) => {
        if (arrayOrders.count > 0) {
          this.tatCaDonHang = arrayOrders.orders;
        }
      });
  }

  watchDetailOrder(madh: number) {
    this.watchAll = false;
    this.watchDetail = true;
    this.orderService.getSingleOrderDetail(madh).subscribe((list) => {
      this.danhSachChiTiet = list;
    });
  }

  watchAllOrder() {
    this.watchAll = true;
    this.watchDetail = false;
  }

  get passwordCurrent() {
    return this.formChangePassword.get('passwordCurrent');
  }

  get passwordNew() {
    return this.formChangePassword.get('passwordNew');
  }

  get passwordConfirm() {
    return this.formChangePassword.get('passwordConfirm');
  }

  changePassword() {
    this.submittedChangePassword = true;
    let passwordNew = this.formChangePassword.get('passwordNew').value;
    let passwordConfirm = this.formChangePassword.get('passwordConfirm').value;
    if (this.formChangePassword.invalid) {
      alert(
        '???? c?? l???i x???y ra trong qu?? tr??nh x??? l??! Vui l??ng ki???m tra l???i c??c th??ng tin ???? ??i???n.'
      );
    } else if (passwordNew !== passwordConfirm) {
      alert(
        'M???t kh???u x??c nh???n l???i kh??ng ????ng v???i m???t kh???u m???i. Vui l??ng nh???p l???i'
      );
    } else {
      this.userService.changePassword(
        this.formChangePassword.value,
        this.nameAccount
      );
      this.submittedChangePassword = false;
      this.formChangePassword.reset();
    }
  }

  clearInput() {
    this.formChangePassword.reset();
  }

  logout() {
    this.clickHistory = true;
    this.clickChangePassword = false;
    localStorage.setItem('idAccount', JSON.stringify(0));
    window.location.href = 'http://localhost:4200';
  }
}
