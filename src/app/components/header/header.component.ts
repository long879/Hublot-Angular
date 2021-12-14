import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import {
  ProductModelServer,
  ServerResponse,
} from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSearchOpen: boolean = false;
  products: ProductModelServer[] = [];
  searchText = '';
  arrFilter: any = [
    [
      {
        trademark: 'Apose',
        active: false,
      },
      {
        trademark: 'Hublot',
        active: false,
      },
      {
        trademark: 'Richard Mille',
        active: false,
      },
      {
        trademark: 'Jacob & Co',
        active: false,
      },
    ],
    [
      {
        category: 'Hublot lễ hội',
        active: false,
      },
      {
        category: 'Hublot cổ điển',
        active: false,
      },
      {
        category: 'Hublot Big Bang',
        active: false,
      },
      {
        category: 'Hublot đặc biệt',
        active: false,
      },
      {
        category: 'Hublot MP',
        active: false,
      },
      {
        category: 'RM 5X',
        active: false,
      },
      {
        category: 'RM 3X',
        active: false,
      },
      {
        category: 'RM 2X',
        active: false,
      },
      {
        category: 'RM 1X',
        active: false,
      },
      {
        category: 'RM 0X',
        active: false,
      },
      {
        category: 'JC ASTRO',
        active: false,
      },
      {
        category: 'JC TURBO',
        active: false,
      },
      {
        category: 'JC BUGATTI',
        active: false,
      },
      {
        category: 'JC SF24',
        active: false,
      },
      {
        category: 'JC PALA',
        active: false,
      },
    ],
    { from: 0, to: 0 },
  ];
  idAccount!: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productsService: ProductService
  ) {
    //@ts-ignore
    this.idAccount = JSON.parse(localStorage.getItem('idAccount'));
  }

  ngOnInit() {
    this.initialAnimations();
    this.scrollHideShowNavbar();
    this.animationMenu();
    this.animationSearch();
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

  selectedFilter(item: any) {
    item.active = !item.active;
  }

  resetFilter() {
    localStorage.setItem('filter', JSON.stringify(null));
    this.arrFilter = [
      [
        {
          trademark: 'Apose',
          active: false,
        },
        {
          trademark: 'Hublot',
          active: false,
        },
        {
          trademark: 'Richard Mille',
          active: false,
        },
        {
          trademark: 'Jacob & Co',
          active: false,
        },
      ],
      [
        {
          category: 'Hublot lễ hội',
          active: false,
        },
        {
          category: 'Hublot cổ điển',
          active: false,
        },
        {
          category: 'Hublot Big Bang',
          active: false,
        },
        {
          category: 'Hublot đặc biệt',
          active: false,
        },
        {
          category: 'Hublot MP',
          active: false,
        },
        {
          category: 'RM 5X',
          active: false,
        },
        {
          category: 'RM 3X',
          active: false,
        },
        {
          category: 'RM 2X',
          active: false,
        },
        {
          category: 'RM 1X',
          active: false,
        },
        {
          category: 'RM 0X',
          active: false,
        },
        {
          category: 'JC ASTRO',
          active: false,
        },
        {
          category: 'JC TURBO',
          active: false,
        },
        {
          category: 'JC BUGATTI',
          active: false,
        },
        {
          category: 'JC SF24',
          active: false,
        },
        {
          category: 'JC PALA',
          active: false,
        },
      ],
      { from: 0, to: 0 },
    ];
  }

  filterProduct() {
    if (this.arrFilter[2].from <= this.arrFilter[2].to) {
      this.productsService.filterProduct(this.arrFilter);
    } else {
      alert(
        'Khoảng giá bạn muốn lọc Từ phải bé hơn Đến. Vui lòng chọn lại khoảng giá phù hợp!'
      );
    }
  }

  initialAnimations(): void {
    gsap
      .timeline()
      .from('.logo', {
        duration: 2,
        xPercent: -100,
      })
      .from('.toggle-first', {
        opacity: 0,
        xPercent: -100,
      })
      .from('.toggle-second', {
        opacity: 0,
        xPercent: -100,
      })
      .from('.navbar__menu-link', {
        opacity: 0,
        xPercent: -100,
        stagger: {
          each: 0.5,
          from: 'end',
        },
      });
  }

  scrollHideShowNavbar(): void {
    let navbar = document.querySelector('.navbar');

    ScrollTrigger.create({
      trigger: '.navbar',
      start: 'top top',
      end: 99999,
      toggleClass: { className: 'navbar--up', targets: '.navbar' },
      scroller: '.scroll',
      onUpdate: ({ direction }) => {
        if (direction == -1) {
          navbar!.classList.remove('navbar--up');
        } else {
          navbar!.classList.add('navbar--up');
        }
      },
    });
  }

  animationMenu(): void {
    const buttonOpen = document.querySelector('.menu__actions-open');
    const buttonClose = document.querySelector('.menu__actions-close');
    const divImageChange = document.getElementById('divImageChange');
    const hoverLink = document.querySelectorAll('li.main__menu-item');

    const menuAnimation = gsap.timeline({ paused: true, reversed: true });

    menuAnimation
      .to('.menu__actions-open', {
        yPercent: -100,
      })
      .to(
        '.menu__actions-close',
        {
          yPercent: -100,
        },
        '<'
      )
      .to(
        '.wrapper-first',
        {
          yPercent: 100,
          ease: 'Expo.easeInOut',
        },
        '<'
      )
      .from('.main__menu', {
        xPercent: -100,
        ease: 'Expo.easeInOut',
      })
      .from(
        '.wrapper__images .wrapper__image',
        {
          xPercent: -150,
          ease: 'Expo.easeInOut',
        },
        '<'
      )
      .from('.main__menu .main__menu-item', {
        x: -200,
        opacity: 0,
        ease: 'Expo.easeInOut',
        stagger: 0.3,
      });

    buttonOpen!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        if (this.isSearchOpen) {
          let button = <HTMLElement>(
            document.querySelector('.menu__search-close')
          );
          button.click();
        }
        this.toggleTween(menuAnimation);
        this.isMenuOpen = !this.isMenuOpen;
      }
    });

    buttonClose!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(menuAnimation);
        this.isMenuOpen = !this.isMenuOpen;
      }
    });

    hoverLink.forEach((el) => {
      el!.addEventListener('mouseover', () => {
        let bg = el.getAttribute('data-bg');
        (
          divImageChange as HTMLImageElement
        ).src = `/assets/images/giaodien/${bg}`;
      });
    });
  }

  animationSearch(): void {
    const buttonOpen = document.querySelector('.menu__search-open');
    const buttonClose = document.querySelector('.menu__search-close');
    // const divImageChange = document.getElementById('divImageChange');
    // const hoverLink = document.querySelectorAll('li.main__menu-item');

    const menuAnimation = gsap.timeline({ paused: true, reversed: true });

    menuAnimation
      .to('.menu__search-open', {
        yPercent: -100,
      })
      .to('.menu__search-close', {
        yPercent: -100,
      })
      .to(
        '.wrapper-second',
        {
          yPercent: 100,
          ease: 'Expo.easeInOut',
        },
        '<'
      );

    buttonOpen!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        if (this.isMenuOpen) {
          let button = <HTMLElement>(
            document.querySelector('.menu__actions-close')
          );
          button.click();
        }
        this.toggleTween(menuAnimation);
        this.isSearchOpen = !this.isSearchOpen;
      }
    });

    buttonClose!.addEventListener('click', (e) => {
      if (menuAnimation.isActive()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      } else {
        this.toggleTween(menuAnimation);
        this.isSearchOpen = !this.isSearchOpen;
      }
    });
  }

  toggleTween(tween: any): void {
    tween.reversed() ? tween.play() : tween.reverse();
  }
}
