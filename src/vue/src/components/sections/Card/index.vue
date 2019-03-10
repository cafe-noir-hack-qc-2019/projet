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
 import { get } from 'lodash';
  export default {
    name: 'Card',
    components: {},
    props: {
      card: {
        type: Object,
      }
    },
    data() {
      return {

      }
    },
    computed: {
      route() {
        return { 
          name: 'infoDetail.fr', 
          params: {
            categorySlug: get(this.card, 'category.slug'),
            themeSlug: get(this.card, 'theme.slug'),
            optionSlug: get(this.card, 'option.slug'),
          }
        };
      }
    },
    methods: {
    },
  }
</script>

<template>
  <li class="Card">
    <router-link :class="['item', {'-disabled': card.fake}]" :to="route">
      <img class="thumb" :src="`/static/card/${card.image}`" alt="">
      <span class="label">
        <span v-html="card.category.label" /><br />
        <span v-html="card.theme.label" />
        <span v-if="card.option" v-html="card.option.label" />
      </span>
    </router-link>
  </li>
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
  .Card
    max-width 100%
    &:nth-child(n+1)
      margin-bottom 10px
  .item
    border-radius 3px
    flexbox(row, $justify: center, $align: center)
    &.-disabled
      pointer-events none
      opacity 0.5
  .thumb
    ratio-box(400/200)
    border-radius 3px
    display block
  .label
    position absolute
    z-index 1
    color white
    width 70%
    text-align center
    font-weight 700

  /* ===DEBUG=== */

</style>
