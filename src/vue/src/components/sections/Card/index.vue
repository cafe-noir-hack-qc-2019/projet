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
  <li :class="['Card', {'-disabled': card.fake}]">
    <router-link :class="['item']" :to="route">
      <img class="thumb" :src="`/static/card/${card.image}`" alt="">
      <span class="label">
        <span v-html="card.title" />
        <template v-if="card.fake">
          <br />
          <span class="fake-alert">(bientôt disponible)</span>
        </template>
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
    position relative
    max-width 100%
    &:nth-child(n+1)
      margin-bottom 10px
    &:after
      content ''
      // background black 
      background $c-pickled-bluewood
      size 100%
      absolute 0
      border-radius 3px
      opacity 0.5
      pointer-events none

    &.-disabled
      pointer-events none
      opacity 0.4 !important

  .item
    border-radius 3px
    flexbox(row, $justify: center, $align: center)

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
    f-size(1.8rem 1.8rem)

  .fake-alert
    font-size 1.3rem

  /* ===DEBUG=== */

</style>
