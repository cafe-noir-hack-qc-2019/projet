<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import { TweenMax } from 'gsap';
import store from './store';

export default {
  name: 'PageHome',
  components: {
  },
  data() {
    return {
      postalCode: null, // @todo geoloc
      placehodlerInput: 'Code postal',
      postalReady: false
    }
  },
  computed: {
    ...mapGetters({
      title: 'PageHome/title',
      intro: 'PageHome/intro',
      postalText: 'PageHome/postalText',
    }),
  },
  /**
   * Register page store and load datas if needed
   */
  beforeCreate() {
    if (!this.$store.state.PageHome) {
      this.$store.registerModule('PageHome', store);
    }
    this.$store.dispatch('PageHome/LOAD');
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
    enter(el, done) {
      console.log('ENTER');
      TweenMax.fromTo(el, 0.3, { opacity: 0, y: -20}, { opacity: 1, y: 0, delay: 0.3, onComplete: done} )
    },
    leave(el, done) {
      console.log('LEAVE');
      TweenMax.to(el, 0.3, { opacity: 0, y: 20, onComplete: done})
    }
  },
};
</script>

<template>
  <div class="PageHome _container">
    <header class="header">
      <div class="logo"></div>
      <h1
        class="title"
        v-html="title" />
    </header>
    <transition
      @enter="enter"
      @leave="leave"
      mode="out-in"
      @css="false"

    >
      <div v-if="postalReady" key="out">
        <div
          class="text"
          v-html="postalText" />
        <div class="postal-code-container">
          <input class="postal-code-input" type="text" v-model="postalCode" :placeholder="placehodlerInput" @focus="placehodlerInput = ''" @blur="placehodlerInput = 'Code Postal' " />
          <button class="btn" @click="go">GO</button>
        </div>
      </div>
      <div v-else key="text">
        <div
          class="text"
          v-html="intro" />
        <button class="btn" @click="setPostalReady">GO</button>
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
  header
    flexbox(column, $align: center)
    width 90%
    margin auto

  .logo
    size 150px
    border-radius 50%
    background #41AFC4
    flexbox(column, $align: center, $justify: center)
    color white
    margin-top 100px

  .title
    color black
    margin-top 20px
    font-weight 800
    f-size(1.8rem)

  .text
    text-align center
    f-size(1.5rem)
    margin-top 10px
    color $c-grey

  .postal-code-container
    width 80%
    margin 30px auto 0
    flexbox(column, $align: center)

  .postal-code-input
    width 100%
    text-align center
    margin-bottom 30px
    padding 10px
    text-transform uppercase
    f-size(1.9rem 1.9rem)
    border-radius 3px
    border none
    color $c-grey
    &:focus
      outline none
  
  .btn
    margin-top 15px

  //  ===DEBUG===
  [data-debug-mode="true"] .PageHome
    //
</style>
