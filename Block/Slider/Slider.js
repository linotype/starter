import { Controller } from "stimulus"
import Swiper from 'swiper/bundle';

import 'swiper/swiper-bundle.css';

export default class extends Controller {

  connect() {
    console.log("Hello, Stimulus Slider!", this.element)
    this.swiper = new Swiper(this.element, {
      ...this.defaultOptions
    })
  }

  disconnect() {
    this.swiper.destroy()
    this.swiper = undefined
  }

  get defaultOptions() {
    return {
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }
  }

}