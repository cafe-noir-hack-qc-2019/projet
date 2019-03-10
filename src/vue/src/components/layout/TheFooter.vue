<docs>
# TheFooter
> The footer

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheFooter',
  components: {},
  computed: {
    ...mapGetters({
      contact: 'Global/contact',
      socials: 'Global/socials',
    }),
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="TheFooter">
    <div class="">
      <div class="footer-icon">
        <router-link to="/" class="item">
          <img src="/static/call.svg" alt="" class="icon">
          <p>Accueil</p>
        </router-link>
        <router-link :to="{name: 'bot.fr'}" class="item">
          <img src="/static/magnifier.svg" alt="" class="icon">
          <p>Rechercher</p>
        </router-link>
        <a class="item" href="tel:+311">
          <img src="/static/call.svg" alt="" class="icon">
          <p>Appeler</p>
        </a>
      </div>
    </div>
  </footer>
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
  .TheFooter
    fixed bottom 0
    width 100%
    background white
    padding-top 5px
    padding-bottom 5px
    max-width 375px
  .footer-icon
    flexbox(row)
  .icon
    img
      width
  .item
    flexbox(column, $align: center)
    width 33%
    img
      size 20px
    p
      f-size(1.4rem)
      margin-top 5px
      color $c-blue

  //  ===DEBUG===
  [data-debug-mode="true"] .TheFooter
    //
</style>
