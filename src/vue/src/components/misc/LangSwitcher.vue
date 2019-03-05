<docs>
# LangSwitcher
> change our website's locale

- stay to the same page
  - [ ] @todo same slug for articles
- list of locales if needed
- may be intercepted in `router` to trigger some page reload
  - if not, be sure to update all your datas

@author Camille Boissel <camille@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LangSwitcher',
  components: {},
  props: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      locales: 'I18n/locales',
      currentLocale: 'I18n/locale',
      otherLocales: 'I18n/otherLocales',
      otherLocale: 'I18n/otherLocale',
    }),
  },
  methods: {},
};
</script>

<template>
  <nav class="LangSwitcher">
    <ul v-if="locales.length > 2">
      <li
        v-for="locale in otherLocales"
        :key="locale">
        <router-link
          :to="{name: `${$route.meta.id}.${locale}`, /* params: {slug:$route.params.slugs[locale]} */ }"
          v-html="locale" />
      </li>
    </ul>
    <router-link
      v-else
      :to="{name: `${$route.meta.id}.${otherLocale}`, /* params: {slug: $route.params.slugs[otherLocale]} */ }"
      v-html="otherLocale" />
  </nav>
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
  .LangSwitcher
    f-style($uppercase: true)

  //  ===DEBUG===
  [data-debug-mode="true"] .LangSwitcher
    //
</style>
