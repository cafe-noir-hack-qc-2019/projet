<docs>
# BuilderSpacer
> PageBuilder's Spacer component

Simply add some margins...

@todo
- [ ] validate props size to force match what we handle...

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
export default {
  name: 'BuilderSpacer',
  props: {
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    /** @returns {String} height in px (or null) depending of props `size` */
    height() {
      switch (this.size) {
        case 'simple':
          return '15px';
        case 'double':
          return '30px';
        case 'triple':
          return '45px';
        default:
          return null;
      }
    },
  },
};
</script>

<template>
  <div
    :style="{height}"
    class="BuilderSpacer"/>
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

  //  ===DEBUG===
  [data-debug-mode="true"] .BuilderSpacer
    //
</style>
