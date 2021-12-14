import {
  ProductModelServer,
  ServerResponse,
} from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  page: number = 1;
  heading: string = '';
  soSanPham: number = 0;
  breadcrumbTH: string = '';
  breadcrumbLSP: string = '';
  products: ProductModelServer[] = [];
  searchText = '';
  subscription: any;
  options: any = [
    { name: 'Từ cao đến thấp', id: 0 },
    { name: 'Từ thấp đến cao', id: 1 },
    { name: 'Từ A đến Z', id: 2 },
    { name: 'Từ Z đến A', id: 3 },
  ];

  constructor(
    private productsService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectShowProduct();
    this.openFilter();
  }

  selectShowProduct() {
    if (this.route.snapshot.params['tenlsp']) {
      this.getAllProductsByType(this.route.snapshot.params['tenlsp']);
    } else if (this.route.snapshot.params['tenth']) {
      this.getAllProductsByTradeMark(this.route.snapshot.params['tenth']);
    } else if (this.route.snapshot.routeConfig?.path?.endsWith('filterData')) {
      //@ts-ignore
      let filter: any = JSON.parse(localStorage.getItem('filter'));
      this.callbackFunction(filter);
    } else {
      this.getAllProducts();
    }
  }

  callbackFunction(data: any) {
    this.products = data.products;
    this.soSanPham = data.count;
    this.heading = this.breadcrumbTH = 'Kết quả lọc';
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      this.soSanPham = prods.count;
      this.heading = this.breadcrumbTH = 'Tất cả sản phẩm';
    });
  }

  getAllProductsByType(tenlsp: string) {
    this.productsService
      .getProductsByType(tenlsp)
      .subscribe((prods: ServerResponse) => {
        this.products = prods.products;
        this.soSanPham = prods.count;
        this.heading = tenlsp;
        this.breadcrumbTH = prods.products[0].tenth;
        this.breadcrumbLSP = tenlsp;
      });
  }

  getAllProductsByTradeMark(tenth: string) {
    this.productsService
      .getProductsByTradeMark(tenth)
      .subscribe((prods: ServerResponse) => {
        this.products = prods.products;
        this.soSanPham = prods.count;
        this.heading = this.breadcrumbTH = tenth;
      });
  }

  addToCart(masp: number) {
    this.cartService.AddProductToCart(masp);
  }

  openFilter(): void {
    const openMenuFilter = document.querySelector('.filter__button');
    const closeMenuFilter = document.querySelector('.wrapper__filter-close');

    const filterMenuAnimation = gsap.timeline({ paused: true, reversed: true });

    filterMenuAnimation
      .to('.navbar', {
        yPercent: -100,
      })
      .to('.wrapper__overlay', {
        xPercent: -100,
      })
      .to('.wrapper__filter-open', {
        xPercent: -100,
      });

    openMenuFilter!.addEventListener('click', (e) => {
      if (filterMenuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(filterMenuAnimation);
      }
    });

    closeMenuFilter!.addEventListener('click', (e) => {
      if (filterMenuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(filterMenuAnimation);
      }
    });
  }

  toggleTween(tween: any): void {
    tween.reversed() ? tween.play() : tween.reverse();
  }

  sort(id: number) {
    if (id === 0) {
      this.products.sort(function (a, b) {
        return b.dongia - a.dongia;
      });
    } else if (id === 1) {
      this.products.sort(function (a, b) {
        return a.dongia - b.dongia;
      });
    } else if (id === 2) {
      this.products.sort(function (a, b) {
        return ('' + a.tensp).localeCompare(b.tensp);
      });
    } else {
      this.products.sort(function (a, b) {
        return ('' + b.tensp).localeCompare(a.tensp);
      });
    }
  }
}
