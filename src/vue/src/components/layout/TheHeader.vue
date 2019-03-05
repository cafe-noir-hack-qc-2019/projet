<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import LogoSvg from 'assets/svg/logo.svg?vue';
import LangSwitcher from 'components/misc/LangSwitcher';

export default {
  name: 'TheHeader',
  components: {
    LogoSvg,
    LangSwitcher,
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      open: 'Menu/open',
      menu: 'Global/menu',
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
        <router-link :to="{name: `home.${locale}`}">
          <LogoSvg class="logo" />
        </router-link>
        <nav>
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
        <LangSwitcher />
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
    vertical-padding(10)

  .header-block
    flexbox($align: center, $justify: space-between)

  .logo
    width 50px
    stroke $c-white
    stroke-width 10px

  ul
    flexbox()

  .link
    padding 8px
    margin-left 8px

  //  ===DEBUG===
  [data-debug-mode="true"] .TheHeader
    //
</style>
