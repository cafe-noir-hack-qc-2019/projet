<docs>
# BuilderQuote
> PageBuilder's Quote component

Some Big and bold and paralax sentence
with the author static centered

@todo: Style and animate this

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
export default {
  name: 'BuilderQuote',
  props: {
    /** @params {String} quote - the quote... can be html, but will be injected inside a `<p>` element */
    quote: {
      type: String,
      default: null,
    },
    /** @params {String} author - the author's name of that quote */
    author: {
      type: String,
      default: null,
    },
    /** @params {String} source - the url of that quote */
    source: {
      type: String,
      default: null,
    },
  },
};
</script>

<template>
  <blockquote
    :cite="source"
    class="BuilderQuote">
    <p
      class="quote"
      v-html="quote" />
    <footer class="footer">
      <cite
        class="author"
        v-text="author"/>
    </footer>
  </blockquote>
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
  .BuilderQuote
    position relative

  .quote
    text-transform uppercase
    font-size 10rem
    white-space nowrap
    color rgba($c-black, 0.75)

  .author
    absolute top 50% left 50%
    transform translate(-50%, -50%)
    padding 10px
    background-color rgba($c-white, 0.6)


  //  ===DEBUG===
  [data-debug-mode="true"] .BuilderQuote
    //
</style>
