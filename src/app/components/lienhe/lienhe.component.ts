import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css'],
})
export class LienheComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
