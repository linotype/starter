import { Controller } from "stimulus"
export default class extends Controller {

  connect() {
    
    import("swiper/swiper-bundle.css")

    import("swiper/bundle").then( Swiper => {
      this.Swiper = Swiper.default;

      this.swiper = new this.Swiper(this.element, {
        ...this.defaultOptions
      })

    });

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