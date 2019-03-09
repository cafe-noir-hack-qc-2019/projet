<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'TheHeader',
  components: {
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      postalCode: 'App/postalCode',
      district: 'App/district',
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
};
</script>

<template>
  <header class="TheHeader">
    <div class="_container">
      <div class="header-block">
        <router-link :to="{name: `home.${locale}`}"  class="app-name">
          <h1>Info 311</h1>
        </router-link>
        <!-- <span v-if="postalCode" v-html="postalCode" />
        <span v-if="district" v-html="`(${district})`" /> -->
        <div class="helper">Aide</div>

      </div>
    </div>
  </header>
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
  .TheHeader
    padding-top 10px
    padding-bottom 8px
    position relative
  .header-block
    flexbox($align: center, $justify: space-between)

  .app-name
    width 100%
    color black
    text-align center
  
  .helper
    absolute right 15px top 10px
    color $c-blue
    font-weight 600

  //  ===DEBUG===
  [data-debug-mode="true"] .TheHeader
    //
</style>
