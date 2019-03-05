/**
 * # Interface store
 * > control our interface (viewport, scroll etc)
 *
 * @todo :
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */

import { each, isNumber, throttle } from 'lodash';
import { TweenMax, Power2 } from 'gsap';
import ScrollToPlugin from 'gsapPlugins/ScrollToPlugin'; // eslint-disable-line no-unused-vars
import DomHelper from 'utils/helpers/Dom';
import Modernizr from 'utils/plugins/Modernizr';

export default {
  namespaced: true,
  state: {
    /** @argument {Object} viewport - uptodate viewport sizes */
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    /** @argument {Object} device - Detectizr device */
    device: Modernizr.device,

    /** @argument {HTMLElement} scrollContainer - the Node element where we scroll (body or any node) */
    scrollContainer: document.querySelector('#App'),

    /** @argument {Boolean} scrollable - if container is scrollable or not - @todo watch this where your container stand */
    scrollable: true,
  },
  mutations: {
    /**
     * Update our viewport state
     * resize is handled by this store itself, just need to call the `INIT` action
     * @param {State} state
     */
    RESIZE(state) {
      state.viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    /**
     * Just update store value
     * @param {State} state
     * @param {Boolean} isScrollable = true
     *
     * @todo :
     * - disable js scroll events or content
     *  - [ ] if events, use disableScroll
     *  - [ ] if content, watch if scrollbar don't disapear in window
     *    (maybe watch this in your component...)
     */
    SET_SCROLL(state, isScrollable = true) {
      if (isScrollable === state.scrollable) {
        return;
      }
      // if (isScrollable) {
      //   // console.log('ENABLE');
      //   disableScroll.off();
      // } else {
      //   // console.log('DISABLE');
      //   disableScroll.on();
      // }
      state.scrollable = isScrollable;
    },
  },
  actions: {
    /**
     * Init our interface
     * basicaly just listen for resize...
     * @param {Store} store
     */
    INIT({ commit, state }) {
      window.addEventListener('resize', throttle(() => {
        commit('RESIZE');
      }, 250));

      // @todo explore and fix this
      // in some phones, viewport takes time to be correct values
      // watch resize (use many intervals because ios take time to compute its true viewport)
      let { width } = state.viewport;
      each([0, 200, 500, 750, 1000], (delay) => {
        setTimeout(() => {
          if (width !== window.innerWidth) {
            width = window.innerWidth;
            commit('RESIZE');
          }
        }, delay);
      });
    },

    /* SCROLLS */

    /**
     * toggle scroll
     * @param {Store} store
     * @param {Boolean} isScrollable = true
     */
    TOGGLE_SCROLL({ commit, getters }, isScrollable = null) {
      const scrollable = isScrollable === null ? !getters.scrollable : isScrollable;
      commit('SET_SCROLL', scrollable);
    },
    ENABLE_SCROLL({ commit }) {
      commit('SET_SCROLL', true);
    },
    DISABLE_SCROLL({ commit }) {
      commit('SET_SCROLL', false);
    },
    /**
     * scroll to some position (y only)
     * use this store so the tween will always be the same :)
     * Oh, and bonus, the duratin will be based on distance to scroll
     *
     * !!! we don't scroll body but in `scrollContainer = #App`
     * (easier to block scroll etc - especialy ios bugs)
     *
     * @param {Number|String|HTMLElement} value - can be the y position (Number), an HTMLElement target or the selector of that target
     * @returns {TweenMax} tween instance (or null if no scroll)
     */
    SCROLL_TO({ dispatch, getters }, payload) {
      const BASE_SPEED = 1; // Time in secondes per 1,000 pixels
      const container = getters.scrollContainer;

      // compute y (px) whereas value is px, selector or HTMLElement
      const y = (() => {
        let posY = null;
        if (isNumber(payload)) {
          posY = payload;
        } else {
          let target = null;
          if (typeof (payload) === 'string') {
            target = document.querySelector(payload);
          }
          if (DomHelper.isElement(payload)) {
            target = payload;
          }
          if (target) {
            posY = DomHelper.getY(target, container);
          }
        }

        if (!posY) {
          return null;
        }

        return posY;
      })();

      if (!y) return null;

      const currentY = container.scrollTop; // window.scrollY
      const gapY = Math.abs(y - currentY);
      const speed = (gapY * BASE_SPEED) / 1000;

      // now we scroll :)
      dispatch('DISABLE_SCROLL');
      return TweenMax.to(container, speed, {
        scrollTo: {
          y,
          autoKill: false,
        },
        ease: Power2.easeInOut,
        onComplete: () => {
          dispatch('ENABLE_SCROLL');
        },
      });
    },

    /**
     * easy way to scroll top...
     * @param {Store} store
     */
    SCROLL_TOP({ dispatch }) {
      dispatch('SCROLL_TO', 0);
    },
  },
  getters: {
    viewport: state => state.viewport,
    device: state => state.device,
    // isMobile: state => state.viewport.width < 768,
    // isTablet: state => state.viewport.width >= 768 && state.viewport.width <= 1024,
    isDesktop: state => state.viewport.width > 1024,
    scrollContainer: state => state.scrollContainer,
    scrollable: state => state.scrollable,
  },
};
