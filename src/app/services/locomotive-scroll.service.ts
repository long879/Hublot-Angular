import { Injectable } from '@angular/core';
// @ts-ignore
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class LocomotiveScrollService {
  constructor() {}

  locomotiveScroll() {
    let locoScroll = new LocomotiveScroll({
      el: document.querySelector('.scroll'),
      smooth: true,
      tablet: { smooth: true },
      smartphone: { smooth: true },
      reloadOnContextChange: true,
      lerp: 0.04,
      repeat: true,
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('.scroll', {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (document.querySelector('.scroll') as HTMLElement).style
        .transform
        ? 'transform'
        : 'fixed',
    });

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
  }
}
