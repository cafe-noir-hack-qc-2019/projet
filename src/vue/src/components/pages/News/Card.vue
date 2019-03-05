<docs>
# NewsCard
> Card of a news = not the detail, just basic infos

will be shown in news collection page and in homepage's featured news

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { mapState } from 'vuex';
import UiPicture from 'components/ui/picture';
import UiButton from 'components/ui/button';

export default {
  name: 'NewsCard',
  components: {
    UiPicture,
    UiButton,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    intro: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      default: null,
    },
    background: {
      type: [String, Object],
      default() { return null; },
    },
  },
  computed: {
    ...mapState('I18n', {
      locale: ({ locale }) => locale,
    }),
  },
  methods: {
    redirect() {
      this.$router.push({
        name: `article.${this.locale}`,
        params: { slug: this.slug },
      });
    },
  },
};
</script>

<template>
  <article
    class="NewsCard">
    <header
      class="header"
      @click.prevent="redirect">
      <h2
        class="title"
        v-html="title"/>
      <ui-picture
        :src="background"
        :overlay="true"
        class="background"
        cover="cover"/>
    </header>
    <p
      class="intro"
      v-html="intro"/>

    <ui-button
      :to="{name: `article.${locale}`, params: {slug} }"
      :label="$t('LABELS.read_more')"
      class="cta"
    />
  </article>
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
    ratio-box(19/9)
    position relative
    cursor pointer

  .background
    absolute 0

  .title
    absolute bottom 1em left 1em right 1em
    f-style(title, $color:$c-white)
    z-index 20

  .intro
    margin-top 0.5em

  .cta
    margin-top 0.5em

  //  ===DEBUG===
  [data-debug-mode="true"] .NewsCard
    //
</style>
