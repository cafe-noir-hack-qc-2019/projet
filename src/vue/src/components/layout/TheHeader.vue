<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import LogoSvg from 'assets/svg/logo.svg?vue';

export default {
  name: 'TheHeader',
  components: {
    LogoSvg,
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
        <router-link :to="{name: `home.${locale}`}"  class="logo">
          <h1>Info 311</h1>
        </router-link>
        <span v-if="postalCode" v-html="postalCode" />
        <span v-if="district" v-html="`(${district})`" />
        <!-- <nav>
          <ul>
            <li
              v-for="item in menu.primary"
              :key="item.slug"
            >
              <router-link
                :to="item.url"
                class="link"
                v-html="item.name"
              />
            </li>
          </ul>
        </nav>
        <LangSwitcher /> -->
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
    padding-top 18px
    padding-bottom 15px
  .header-block
    flexbox($align: center, $justify: space-between)

  .logo
    width 100%
    color black
    text-align center
    font-weight 800


  //  ===DEBUG===
  [data-debug-mode="true"] .TheHeader
    //
</style>
