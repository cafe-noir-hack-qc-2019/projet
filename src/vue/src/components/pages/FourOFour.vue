<docs>
# Page404
> The error page

You'll be here if you match an unknown route
or if api's response return 404 (wrong slug etc)

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
export default {
  name: 'Page404',
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <div class="Page404 _container page">
    <h1
      v-t="'PAGE_404.title'"
      class="title _nl2br" />
    <p
      class="description"
      v-html="$t('PAGE_404.description')" />
  </div>
</template>

<i18n>
{
  "en": {
    "PAGE_404": {
      "title": "Ooops,\nwe've don't find that page.",
      "description": "Maybe try to go back to <a href='/en'>this homepage</a><br>or browse our menu"
    }
  },
  "fr": {
    "PAGE_404": {
      "title": "Oups,\nnous n'avons pas trouvé la page que vous désiriez.",
      "description": "Vous pouvez retourner sur <a href='/fr'>notre page d'accueil</a> ou utiliser notre menu"
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
  .page
    flexbox($direction: column, $align:center, $justify:center)
    padding-top 20%

  .title
    f-style(title, h1)
    text-align center

  .description
    margin-top 2em
    >>> a
      text-decoration underline

  //  ===DEBUG===
</style>


<style lang="stylus">
  //  ===NO_SCOPE===
  .Page404
    //
</style>
