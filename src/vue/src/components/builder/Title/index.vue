<docs>
# BuilderTitle
> PageBuilder's Title component

Yep, just a title :)
with some styles

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
export default {
  name: 'BuilderTitle',
  props: {
    title: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: 'h3',
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    class="BuilderTitle"
    v-text="title" />
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
  .BuilderTitle
    f-style(title)

  //  ===DEBUG===
  [data-debug-mode="true"] .BuilderTitle
    //
</style>
