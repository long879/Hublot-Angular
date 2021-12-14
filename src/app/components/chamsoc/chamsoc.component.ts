import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-chamsoc',
  templateUrl: './chamsoc.component.html',
  styleUrls: ['./chamsoc.component.css'],
})
export class ChamsocComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initialAnimationsGrid();
  }

  initialAnimationsGrid(): void {
    const sections = gsap.utils.toArray('.container__grid-col-2');
    sections.forEach((element: any) => {
      let items = element.querySelectorAll('.grid');
      let tl = gsap.timeline({
        paused: true,
        ease: 'power4.inOut',
      });

      ScrollTrigger.create({
        trigger: items,
        start: 'top center',
        end: 'top center',
        scroller: '.scroll',
        onEnter: () => tl.play(),
      });

      tl.from(items[0], {
        xPercent: -100,
      }).from(
        items[1],
        {
          xPercent: 100,
        },
        '<'
      );
    });

    gsap.from('.image-transform', {
      scrollTrigger: {
        trigger: '.container__interview-tranform',
        start: 'top center',
        end: 'top center',
        scroller: '.scroll',
      },
      opacity: 0,
      stagger: {
        each: 0.4,
        from: 'start',
      },
    });

    gsap
      .timeline()
      .from('.container__interview-second .container__interview-subtitle', {
        scrollTrigger: {
          trigger: '.container__interview-second',
          start: 'top center',
          end: 'top center',
          scroller: '.scroll',
        },
        opacity: 0,
      })
      .from('.container__interview-second .container__interview-heading', {
        scrollTrigger: {
          trigger: '.container__interview-second',
          start: 'top center',
          end: 'top center',
          scroller: '.scroll',
        },
        opacity: 0,
      })
      .from('.container__interview-second .container__interview-column', {
        scrollTrigger: {
          trigger: '.container__interview-second',
          start: 'center center',
          end: 'center center',
          scroller: '.scroll',
        },
        opacity: 0,
      });
  }
}
