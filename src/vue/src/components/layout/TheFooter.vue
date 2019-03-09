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
    <div class="_container">
      <router-link :to="{name: 'bot.fr'}">Rechercher</router-link>
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
    vertical-padding(10)
    f-style($size: 1.2rem)

  .row
    flexbox($align: center, $justify: space-between)

  .copyrights
    text-align center

  nav
    ul
      flexbox($align: center, $justify: space-between)

      a
        margin-left 10px
        f-style($size: 2.3rem)

  //  ===DEBUG===
  [data-debug-mode="true"] .TheFooter
    //
</style>
