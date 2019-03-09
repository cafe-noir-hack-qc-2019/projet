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
  import store from './store';
export default {
    name: 'InfoList',
    components: {},
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
        themeChaud: 'InfoList/themeChaud',
        heltText: 'InfoList/heltText',
        popularThemes: 'App/popularThemes',
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
      this.$store.dispatch('InfoList/LOAD');
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
          <li class="list-item" v-for="theme in popularThemes" :key="theme.id">
            <router-link  class="item" :to="{ name: 'infoDetail.fr', params: {categorySlug: theme.category.slug, themeSlug: theme.theme.slug} }">
              <img class="thumb" src="https://picsum.photos/300/300/?random" alt="">
              <span class="label">
                <span v-html="theme.category.label" /><br />
                <span v-html="theme.theme.label" />
              </span>
            </router-link>
          </li>
        </transition-group>
      </div>
      <h1
        class="title bot"
        v-html="heltText" />
      <button class="btn-bot">Aidez-moi !</button>
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
    flexbox(row, $justify: space-between)
  .list-collection
    margin-top 10px
  .list-item
    max-width 48%
  .item
    border-radius 3px
    flexbox(row, $justify: center, $align: center)
    ratio-box(200/200)
  .thumb
    border-radius 3px
  .label
    position absolute
    z-index 1
    color white
    width 70%
    text-align center
    font-weight 700
  .title
    &.bot
      margin-top 40px
  .btn-bot
    margin-top 30px
    margin-bottom 60px

  /* ===DEBUG=== */

</style>
