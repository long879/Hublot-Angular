import { Component, OnInit } from '@angular/core';
import { LocomotiveScrollService } from './services/locomotive-scroll.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any = {};
  customOptions: OwlOptions = {
    items: 1,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: true,
  };

  constructor(private _locomotiveScrollService: LocomotiveScrollService) {}

  ngOnInit() {
    this._locomotiveScrollService.locomotiveScroll();
  }
}
