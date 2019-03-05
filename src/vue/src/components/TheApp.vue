<docs>
# TheApp
> *the main application*

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import TheHeader from 'components/layout/TheHeader';
import TheFooter from 'components/layout/TheFooter';
import TheLoader from 'components/TheLoader';

export default {
  name: 'TheApp',
  components: {
    TheHeader,
    TheFooter,
    TheLoader,
  },
  computed: {
    ...mapGetters({
      loaded: 'Loader/loaded',
      viewport: 'Interface/viewport',
      scrollable: 'Interface/scrollable',
    }),
    dynamicStyles() {
      /* Usefull to:
          - fix 100vw (some browsers does/does not count the scrollbar)
          - fix 100vh (some mobile does/does not count the top bar)
      */
      return `
        ._fullViewport,
        ._fullViewportW,
        ._fullViewportH {
          overflow: hidden;
        }
        ._fullViewport {
          position: relative;
          width: ${this.viewport.width}px;
          height: ${this.viewport.height}px;
        }
        ._fullViewportW {
          width: ${this.viewport.width}px;
        }
        ._fullViewportH {
          height: ${this.viewport.height}px;
        }
        :root {
          --viewport-width: ${this.viewport.width}px;
          --viewport-height: ${this.viewport.height}px;
        }
      `;
    },
  },
  created() {
    // init our interface (viewport etc)
    this.$store.dispatch('Interface/INIT');
  },
};
</script>

<template>
  <div
    id="App"
    :data-debug-mode="$root.debug"
    :data-scrollable="scrollable.toString()"
    class="_fullViewport">

    <div
      v-if="loaded"
      class="app">
      <TheHeader />
      <main class="page">
        <router-view v-if="loaded" />
      </main>
      <TheFooter />
    </div>

    <TheLoader v-if="!loaded"/>
    <component
      :is="'style'"
      v-html="dynamicStyles"/>
  </div>
</template>

<style lang="stylus" scoped>
  /**
   * =LAYOUT
   * =DEBUG
   */

  /* ===LAYOUT=== */

  /* ===DEBUG=== */


</style>
