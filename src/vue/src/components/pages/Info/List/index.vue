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
        popularThemes: 'App/popularThemes',
      }),
    },
    watch: {
      district: {
        handler() {
          this.$store.dispatch('App/GET_THEMES_BY_DISTRICT');
        }
      }
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
      // if (!this.postalCode) {
      //   this.$router.push({ name: 'home.fr' })
      // }
      this.$store.dispatch('App/GET_DISTRICT');
    },
    methods: {},
  }
</script>

<template>
  <div class="InfoList">
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
        <ul class="list">
          <li class="list-item" v-for="theme in popularThemes" :key="theme.id">
            <router-link  class="item" :to="{ name: 'infoDetail.fr', params: {themeSlug: theme.slug} }">
              <img class="thumb" src="https://picsum.photos/300/300/?random" alt="">
              <span class="label" v-html="theme.label" />
            </router-link>
          </li>
        </ul>
      </div>
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

  /* ===DEBUG=== */

</style>
