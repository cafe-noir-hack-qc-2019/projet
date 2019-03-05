<docs>
# PageNewsSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import UiPicture from 'components/ui/picture';
import PageBuilder from 'components/builder';
import Store from './store';

export default {
  name: 'PageNewsSingle',
  components: { UiPicture, PageBuilder },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    /**
     * @argument {Object} article - our entry datas
     */
    entry() {
      return this.$store.getters['News/getEntryBySlug'](this.slug);
    },
  },
  watch: {
    /** watch slug from route to load datas
     * Note that we may stay on the same component within some other slug
     */
    slug: {
      handler(slug) {
        if (!slug) { return; }
        this.$store.dispatch('News/LOAD_SINGLE', slug);
      },
      immediate: true,
    },
  },
  /** register news store if needed - load datas on slug change */
  beforeCreate() {
    if (!this.$store.state.News) {
      this.$store.registerModule('News', Store);
    }
  },
};
</script>

<template>
  <div
    class="page PageNewsSingle">
    <template v-if="entry">
      <header class="header">
        <h2
          class="title"
          v-html="entry.title"/>
        <ui-picture
          :src="entry.background"
          :overlay="true"
          class="background"
          cover="cover"/>
      </header>
      <div class="page-content">
        <p
          class="intro _nl2br"
          v-html="entry.description"/>
        <section class="section-builder">
          <page-builder :components="entry.pagebuilder"/>
        </section>
      </div>
    </template>
  </div>
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

  .header
    ratio-box(21/5)
    position relative

  .background
    absolute 0

  .title
    absolute bottom 1em left 50%
    f-style(title, h1, $color:$c-white)
    z-index 20
    width 80%
    max-width 1200px
    transform translateX(-50%)

  .page-content
    margin-left auto
    margin-right auto
    width 80%
    max-width 1200px

  .intro
    margin-top 1em
    f-style()

  .section-builder
    border-top 1px solid $c-black
    margin-top 2em
    padding-top 2em


  //  ===DEBUG===
  [data-debug-mode="true"] .PageNewsSingle
    //
</style>
