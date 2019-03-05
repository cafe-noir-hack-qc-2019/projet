<docs>
# PageDemo
> Demo page for different features of our incredible stack ;)

@todo : lot of stuff ;)

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageDemo',
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
      device: 'Interface/device',
    }),
  },
};
</script>

<template>
  <div class="PageDemo">
    <div class="_container">
      <h1>Hello</h1>
      <section>
        <h2>Interface</h2>
        <pre>
          viewport: {{ viewport.width }} / {{ viewport.height }}
          device: {{ device.type }}
        </pre>
      </section>

      <section>
        <h2>i18n</h2>
        <pre>
          $root.locale: {{ $root.locale }}
          test locale: {{ $t('title') }}
        </pre>
      </section>
    </div>
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

  //  ===DEBUG===
</style>
