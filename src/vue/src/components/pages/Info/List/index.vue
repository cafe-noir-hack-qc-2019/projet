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
        popularCards: 'App/popularCards',
        themeChaud: 'InfoList/themeChaud',
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
    mounted() {
    },
    methods: {
      getRoute(card) {
        return { 
          name: 'infoDetail.fr', 
          params: {
            categorySlug: get(card, 'category.slug'),
            themeSlug: get(card, 'theme.slug'),
            optionSlug: get(card, 'option.slug'),
          }
        };
      },
    },
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
          <li class="list-item" v-for="card in popularCards" :key="card.id">
            <router-link  class="item" :to="getRoute(card)">
              <img class="thumb" src="https://picsum.photos/300/300/?random" alt="">
              <span class="label">
                <span v-html="card.category.label" /><br />
                <span v-html="card.theme.label" />
                <span v-if="card.option" v-html="card.option.label" />
              </span>
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
