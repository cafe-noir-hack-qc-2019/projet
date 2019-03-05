/** # generic swiper plugin
 * > handle only this (simple) image swiper
 *
 * - optional autoplay
 * - optional pagination
 * - optional navigation
 * - auto import css
 *
 * @use
 * import SwiperPlugin from 'plugins/Swiper'
 * new SwiperPlugin('.my-swiper')
 *
 * @author nicolas <nicolas@kffein.com>
 */
import { assign, random } from 'lodash';
import { isElement } from 'utils/helpers/Dom';
import Swiper from 'swiper/dist/js/swiper.js';
// css
import 'swiper/dist/css/swiper.css';
import './index.styl';

export default class SwiperPlugin {
  constructor(el, options = {}) {
    if (!isElement(el)) {
      return;
    }

    this.element = el;
    this.options = assign({
      loop: true,
      slidesPerView: 1,
      // autoplay: {
      //   delay: 5000,
      //   speed: 5000,
      // },
      // pagination: {
      //   el: this.paginationTarget,
      //   clickable: true,
      // },
      // navigation: {
      //   nextEl: this.nextTarget,
      //   prevEl: this.prevTarget,
      // },
    }, options);

    this.swiper = this.createSwiper(this.options);
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  }

  /**
   * create our swiper instance
   * stop autoplay on first interaction
   * @return {Object} Swiper instance
   */
  createSwiper() {
    // remember if we have stoped our autoswiper
    let touched = false;

    const swiper = new Swiper(this.element, {
      ...this.options,
      on: {
        touchStart: () => {
          if (!swiper.autoplay.running) {
            return;
          }
          touched = true;
          swiper.autoplay.stop();
        },
      },
    });

    // async autoplay (so not all at the same time)
    if (this.options.autoplay) {
      swiper.autoplay.stop();
      const { delay } = this.options.autoplay;
      const randomDelay = delay + random(delay);
      setTimeout(() => {
        if (!touched) {
          swiper.slideNext();
          swiper.autoplay.start();
        }
      }, randomDelay);
    }

    return swiper;
  }
}
