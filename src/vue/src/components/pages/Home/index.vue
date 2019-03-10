<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import { TweenMax, Power1} from 'gsap';
import store from './store';

export default {
  name: 'PageHome',
  components: {
  },
  data() {
    return {
      postalCode: null, // @todo geoloc
      placehodlerInput: 'XXX-XXX',
      postalReady: false
    }
  },
  computed: {
    ...mapGetters({
      title: 'PageHome/title',
      intro: 'PageHome/intro',
      postalText: 'PageHome/postalText',
      titleSearch: 'PageHome/titleSearch',
      infobulle: 'PageHome/infobulle',
    }),
  },
  /**
   * Register page store and load datas if needed
   */
  beforeCreate() {
    if (!this.$store.state.PageHome) {
      this.$store.registerModule('PageHome', store);
    }
  },
  mounted() {
    setTimeout(() => {
      this.postalReady = true
    }, 1000);
  },
  // beforeDestroy() {
  //   // !!! Do not unregister store
  //   // or datas will be deleted and you will need to re-call api
  //   this.$store.unregisterModule('PageHome');
  // },
  methods: {
    go() {
      this.$store.commit('App/SET_POSTAL_CODE', this.postalCode);
      this.$router.push({ name: 'infoList.fr' })
    },
    setPostalReady() {
      this.postalReady = true
    },
    flipIn(el, done) {
      TweenMax.fromTo(el, 0.5, { css: { transform: 'rotateY(90deg)'}}, { css: { transform: 'rotateY(0)'}, ease: Power1.easeOut, onComplete: done} )
    },
    flipOut(el, done) {
      TweenMax.to(el, 0.2, { css: { transform: 'rotateY(90deg)'}, ease: Power1.easeIn, onComplete: done})
    },
    enter(el, done) {
      TweenMax.fromTo(el, 0.2, { opacity: 0, y: 10}, { opacity: 1, y: 0, onComplete: done} )
    },
    leave(el, done) {
      TweenMax.to(el, 0.3, { opacity: 0, y: -10, onComplete: done})
    }
  },
};
</script>

<template>
  <div class="PageHome _container">

    <transition
      @enter="flipIn"
      @leave="flipOut"
      mode="out-in"
      @css="false"
    >
      <header class="header" v-if="postalReady" key="in">
        <div class="logo robot"><img src="/static/boto.svg" alt=""></div>
      </header>
      <header class="header" v-else key="out">
        <div class="logo"><img src="/static/logo.png" alt=""></div>
      </header>
    </transition>

    <transition
      @enter="enter"
      @leave="leave"
      mode="out-in"
      @css="false"
    >
      <div v-if="postalReady" :class="[{'is-active': postalReady}, 'container']" key="out">
        <h1
          class="title"
          v-html="titleSearch" />
        <div class="bot-helper">
          <div class="icon bot"></div>
          <div class="info-bulle" v-html="infobulle"></div>
        </div>
        <div class="postal-code-container">
          <div class="input-container loc">
            <input class="input" type="text" v-model="postalCode" :placeholder="placehodlerInput" @focus="placehodlerInput = ''" @blur="placehodlerInput = 'Code Postal' " @keyup.enter="go" />
          </div>
          <button class="btn" @click="go">Rechercher</button>
        </div>
      </div>
      <div :class="[{'is-intro': !postalReady}, 'container']" v-else key="text">
        <h1
          class="title">
          INFOS <span>311</span>
        </h1>
        <!-- <div
          class="text"
          v-html="intro" /> -->
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
  .text
    text-align center
    f-size(1.5rem)
    margin-top 20px
    color $c-grey

  .postal-code-container
    width 80%
    margin 0px auto 0
    flexbox(column, $align: center)

  .is-intro
    .title
      margin-top 20px
      f-size(2.3rem 2.3rem)
      line-height 1
      color lighten($c-black, 30%)
      span
        f-size(4rem 4rem)
        display block

  //  ===DEBUG===
  [data-debug-mode="true"] .PageHome
    //
</style>
