<docs>
# PageHome
> simply the homepage

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import NewsCard from 'components/pages/News/Card';
import store from './store';

export default {
  name: 'PageHome',
  components: {
    NewsCard,
  },
  computed: {
    ...mapGetters({
      title: 'PageHome/title',
      intro: 'PageHome/intro',
      news: 'PageHome/news',
    }),
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
  /**
   * Register page store and load datas if needed
   */
  beforeCreate() {
    if (!this.$store.state.PageHome) {
      this.$store.registerModule('PageHome', store);
    }
    this.$store.dispatch('PageHome/LOAD');
  },
  // beforeDestroy() {
  //   // !!! Do not unregister store
  //   // or datas will be deleted and you will need to re-call api
  //   this.$store.unregisterModule('PageHome');
  // },
};
</script>

<template>
  <div class="PageHome _container">
    <header class="header">
      <h1
        class="title"
        v-html="title" />
      <div
        class="wysiwyg"
        v-html="intro" />
    </header>
    <section class="section-news">
      <header>
        <h2
          v-t="'PAGE_HOME.featured_news_title'"
          class="subtitle" />
      </header>

      <ul class="list">
        <li
          v-for="article in news"
          :key="`article-${article.id}`"
          class="item">
          <NewsCard v-bind="article" />
        </li>
      </ul>
    </section>
  </div>
</template>

<i18n>
{
  "en": {
    "PAGE_HOME":{
      "featured_news_title": "Featured news"
    }
  },
  "fr": {
    "PAGE_HOME":{
      "featured_news_title": "Nouvelles a la une"
    }
  }
}
</i18n>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
  .title
    f-style(title, h1)
    vertical-padding()
  .subtitle
    f-style(title)
    vertical-margin()

  .section-news
    margin-top 2em
    .list
      flexbox(row, $align: stretch)
      >.item
        flex-basis 49%
        +mobile()
          flex-basis 100%

  //  ===DEBUG===
  [data-debug-mode="true"] .PageHome
    //
</style>
