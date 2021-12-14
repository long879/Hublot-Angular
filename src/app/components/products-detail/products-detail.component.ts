import { ProductModelServer } from './../../models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit {
  masp: number = 0;
  product!: ProductModelServer;
  randomProductList: ProductModelServer[] = [];
  @ViewChild('quantityInput') quantityInput: any;
  @ViewChild('owlMac') owlMac!: CarouselComponent;
  @ViewChild('owlCat') owlCat!: CarouselComponent;
  customOptions: OwlOptions = {
    items: 1,
    dots: false,
    URLhashListener: true,
    startPosition: 'URLHash',
  };

  categoriesOptions: any = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    dots: false,
    dotsSpeed: 300,
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 4,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
  };
  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dragEndSpeed: 450,
    items: 1,
  };

  categories: any = {
    items: [
      {
        id: 'slide-1',
        displayedName: 'Slide 1',
      },
      {
        id: 'slide-2',
        displayedName: 'Slide 2',
      },
      {
        id: 'slide-3',
        displayedName: 'Slide 3',
      },
      {
        id: 'slide-4',
        displayedName: 'Slide 4',
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.initInfoProduct();
  }

  slideTo(category: string) {
    this.owlMac.moveByDot(category);
  }

  changeSlide($event: any) {
    if (this.owlCat) {
      // this.category$.next($event.slides[0].id);
      this.owlCat.moveByDot(this.owlCat.dotsData.dots[$event.startPosition].id);
    }
  }

  initInfoProduct() {
    this.masp = this.route.snapshot.params['masp'];
    this.productService.getSingleProduct(this.masp).subscribe((prod) => {
      this.product = prod;
      this.randomProduct();
    });
  }

  randomProduct() {
    this.productService
      .getProductsByTradeMark(this.product.tenth)
      .subscribe((prod) => {
        let list = prod.products.filter(
          (p) => JSON.stringify(p) !== JSON.stringify(this.product)
        );
        while (true) {
          var item = list[Math.floor(Math.random() * list.length)];
          this.randomProductList.push(item);
          list = list.filter((p) => JSON.stringify(p) !== JSON.stringify(item));
          if (this.randomProductList.length === 3) {
            break;
          }
        }
      });
  }

  addToCart(id: number) {
    let value = parseInt(this.quantityInput.nativeElement.value);
    this.cartService.AddProductToCart(id, value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.soluong >= 1) {
      value++;

      if (value > this.product.soluong) {
        value = this.product.soluong;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.soluong > 0) {
      value--;

      if (value <= 1) {
        value = 1;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
