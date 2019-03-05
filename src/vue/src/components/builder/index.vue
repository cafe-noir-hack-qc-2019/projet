<docs>
# PageBuilder
> This component will loop an array of builder components

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { map } from 'lodash';
import StringHelper from 'utils/helpers/Strings';

const debug = process.env.NODE_ENV === 'development'; // && false;

// this allow to load only needed components and chunk them in pagebuilder.js
const components = {
  BuilderTitle: () => import(/* webpackChunkName: "pagebuilder" */ './Title'),
  BuilderQuote: () => import(/* webpackChunkName: "pagebuilder" */ './Quote'),
  BuilderSpacer: () => import(/* webpackChunkName: "pagebuilder" */ './Spacer'),
  // 'text',
  // 'video',
  // 'image',
  // 'quote',
  // 'gallery',
  // 'twoImages',
  // 'cta',
  // 'spacer',
  // 'textImage',
};

export default {
  name: 'PageBuilder',
  components,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    components: {
      type: Array,
      default() { return []; },
    },
  },
  methods: {
    /**
     * @returns {String} the correct component name (or null)
     */
    getComponent({ component }) {
      const name = `Builder${StringHelper.capitalize(component)}`;
      if (!components[name]) {
        if (debug) {
          const list = map(components, (c, cptName) => cptName.replace('Builder', '').toLowerCase());
          console.warn(`this component "${component}" is not allowed in pagebuilder : ${[...list]}`); // eslint-disable-line no-console
        }
        return null;
      }
      return `Builder${StringHelper.capitalize(component)}`;
    },
  },
};
</script>

<template>
  <div>
    <component
      :is="tag"
      class="PageBuilder">
      <component
        v-for="(item, index) in components"
        :key="index"
        :is="getComponent(item)"
        v-bind="item.data"
        class="item" />
    </component>
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
  .item
    // default margin-top for each exept when spacer
    &:not(:first-child)
      :not(.BuilderSpacer) + &
        &:not(.BuilderSpacer)
          margin-top 2rem

  //  ===LAYOUT===

  //  ===DEBUG===
  [data-debug-mode="true"] .PageBuilder
    //
</style>
