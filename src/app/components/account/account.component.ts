import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { gsap } from 'gsap';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  // user!: SocialUser; // có.photoUrl, .name, .email
  // <img src="{{ user?.photoUrl }}"> bên template
  //     <div>
  //       <h4>{{ user?.name }}</h4>
  //       <p>{{ user?.email }}</p>
  //     </div>
  // loggedIn!: boolean;
  submittedLogin: boolean = false;
  submittedRegister: boolean = false;
  formLogin!: any;
  formRegister!: any;

  constructor(private userService: UserService, private fb: FormBuilder) {} // private authService: SocialAuthService

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = user != null;
    // });

    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });

    this.formRegister = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });

    this.animationForm();
  }

  get emailLogin() {
    return this.formLogin.get('email');
  }

  get passwordLogin() {
    return this.formLogin.get('password');
  }

  get emailRegister() {
    return this.formRegister.get('email');
  }

  get passwordRegister() {
    return this.formRegister.get('password');
  }

  loginUser() {
    this.submittedLogin = true;
    if (this.formLogin.invalid) {
      alert(
        'Đã có lỗi xảy ra trong quá trình đăng nhập! Vui lòng kiểm tra lại các thông tin đã điền.'
      );
    } else {
      this.userService.loginUser(this.formLogin.value);
      this.submittedLogin = false;
      this.formLogin.reset();
    }
  }

  registerUser() {
    this.submittedRegister = true;
    if (this.formRegister.invalid) {
      alert(
        'Đã có lỗi xảy ra trong quá trình đăng ký! Vui lòng kiểm tra lại các thông tin đã điền.'
      );
    } else {
      this.userService.registerUser(this.formRegister.value);
      this.submittedRegister = false;
      this.formRegister.reset();
    }
  }

  animationForm(): void {
    const buttonRegister = document.querySelector('#toRegisterForm');
    const buttonLogin = document.querySelector('#toLoginForm');

    const menuAnimation = gsap.timeline({ paused: true, reversed: true });

    menuAnimation
      .fromTo(
        '.grid__account-col-right',
        {
          opacity: 1,
        },
        {
          opacity: 0,
        }
      )
      .to(
        '.account-transform',
        {
          xPercent: 100,
          backgroundImage: 'url(/assets/images/giaodien/login.jpg)',
        },
        '<'
      )
      .fromTo(
        '.grid__account-col-left',
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        '<'
      );

    buttonRegister!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(menuAnimation);
      }
    });

    buttonLogin!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(menuAnimation);
      }
    });
  }

  toggleTween(tween: any): void {
    tween.reversed() ? tween.play() : tween.reverse();
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   this.authService.signOut();
  //   console.log('đã click');
  // }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }
}
