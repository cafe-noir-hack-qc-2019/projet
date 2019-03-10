<script>
  /**
  * > **
  *
  * 
  *
  * @author Camille Boissel <boissel.camille@gmail.com>
  *
  * ---
  */
  import { mapGetters } from 'vuex';
  import {get} from 'lodash';
  import Card from 'components/sections/Card';
  import store from './store';
export default {
    name: 'InfoList',
    components: {Card},
    props: {},
    data() {
      return {
        newPostalCode: null, // @todo geoloc
      }
    },
    computed: {
      ...mapGetters({
        postalCode: 'App/postalCode',
        district: 'App/district',
        popularCards: 'App/popularCards',
        themeChaud: 'InfoList/themeChaud',
        heltText: 'InfoList/heltText',
      }),
    },
    watch: {
    },
    /**
     * Register page store and load datas if needed
     */
    beforeCreate() {
      if (!this.$store.state.InfoList) {
        this.$store.registerModule('InfoList', store);
      }
    },
    created() {
    },
    methods: {

      enter(el, done) {
        TweenMax.fromTo(el, 0.2, { opacity: 0, y: -20}, { opacity: 1, y: 0, onComplete: done} )
      },
      leave(el, done) {
        TweenMax.to(el, 0.3, { opacity: 0, y: 20, onComplete: done})
      }
    },
  }
</script>

<template>
  <div class="InfoList _container">
    <header class="header">
      <div class="logo robot"><img src="/static/boto.svg" alt=""></div>
    </header>
    <div class="container">
      <h1
        class="title"
        v-html="themeChaud" />
        <div class="postal-code-container">
          <div class="input-container">
            <input class="input" type="text" v-model="newPostalCode" :placeholder="postalCode" disabled="true" />
          </div>
        </div>
      <div class="list-collection">
        <transition-group
          @enter="enter"
          @leave="leave"
          mode="out-in"
          @css="false"
          tag="ul"
          class="list"
        >
          <Card :card="card" v-for="card in popularCards" :key="card.id" />
        </transition-group>
      </div>
      <h1
        class="title bot"
        v-html="heltText" />
        <router-link :to="{name: 'bot.fr'}" class="btn-bot">
          Aidez-moi !
        </router-link>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  /**
  * 
  * TABLE OF CONTENT
  * --------
  *	=LAYOUT
  *	=DEBUG
  */

  /* ===LAYOUT=== */
  .list
    max-width 90%
    margin auto
    flexbox(row, $justify: space-between, $wrap: wrap)
  .list-collection
    margin-top 10px
  // .list-item
  //   max-width 48%
  // .item
  //   border-radius 3px
  //   flexbox(row, $justify: center, $align: center)
  //   ratio-box(200/200)
  //   &.-disabled
  //     pointer-events none
  //     opacity 0.5
  // .thumb
  //   border-radius 3px
  // .label
  //   position absolute
  //   z-index 1
  //   color white
  //   width 70%
  //   text-align center
  //   font-weight 700
  .title
    &.bot
      margin-top 40px
  .btn-bot
    margin-top 30px
    margin-bottom 90px

  /* ===DEBUG=== */

</style>
