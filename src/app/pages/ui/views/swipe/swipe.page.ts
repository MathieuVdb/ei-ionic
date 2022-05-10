import { Component, OnInit } from '@angular/core';
import Swiper, { EffectCards, Navigation, Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
})
export class SwipePage implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    effect: "cards",
    navigation: true,
    pagination:true
  }

  constructor() { }

  ngOnInit() {
    Swiper.use([EffectCards, Navigation, Pagination])
  }

}
