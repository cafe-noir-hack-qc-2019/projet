<docs>
# PageNewsCollection
> Page news - listing

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import Store from './store';
import NewsCard from './Card';

export default {
  name: 'PageNewsCollection',
  components: {
    NewsCard,
  },
  computed: {
    ...mapGetters({
      entries: 'News/entries',
    }),
  },
  /** register news store if needed and load page */
  beforeCreate() {
    if (!this.$store.state.News) {
      this.$store.registerModule('News', Store);
    }
    const api = this.$store.state.News.apis.collection;
    this.$store.dispatch('News/LOAD', api);
  },
};
</script>

<template>
  <div class="PageNewsCollection _container">
    <h1
      v-t="'PAGE_NEWS.title'"
      class="title" />
    <ul class="list">
      <li
        v-for="article in entries"
        :key="`article-${article.slug}`"
        class="item">
        <NewsCard v-bind="article" />
      </li>
    </ul>
  </div>
</template>

<i18n>
{
  "fr": {
    "PAGE_NEWS":{
      "title": "Toutes les nouvelles"
    }
  },
  "en": {
    "PAGE_NEWS":{
      "title": "All news"
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
    padding-bottom 1em
    f-style(title, h1)
    vertical-padding()

  .list
    flexbox(row, $align: stretch, $wrap:wrap)
    >.item
      flex 0 1 32.5%
      // margin top after 1st row
      &:nth-child(n+4)
        padding-top 2em

  //  ===DEBUG===
  [data-debug-mode="true"] .PageNewsCollection
    //
</style>
