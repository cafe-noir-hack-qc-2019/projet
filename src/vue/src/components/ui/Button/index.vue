<docs>
# UiButton
> *generic way to creat any type of links*

- can be `<router-link>`, `<a>`, `<button>`
- depending on props (`action`, `href`, `to`)

all would be rendered the same way (eg `label`, `icon`...)

@todo :
- [ ] CLEAN IT
  - Not that generic since we hardcode the style and the arrow icon for our project an
- [ ] add Nearby only if wanted (async import etc)

---
@author Camille Boissel <camille@kffein.com>
@author Nicolas Husson <nicolas@kffein.com>
@author Sebastien Levy <sebastien@kffein.com>
</docs>

<script>
export default {
  name: 'UiButton',
  props: {
    /** @augments {Object} to - will use `<router-link>` */
    to: {
      type: [String, Object],
      default() { return null; },
    },
    /** @augments {String} href - will use `<a>` */
    href: {
      type: String,
      default: null,
    },
    /** @augments {Function} action - will use `<button>` */
    action: {
      type: Function,
      default: null,
    },
    /** @augments {String} if define, src equal to href/to */
    src: {
      type: String,
      default: null,
    },
    /**
     * @todo rename this with `target`, so type would be email, phone etc
     * @augments {String} if define, type equal internal/external */
    type: {
      type: String,
      default: null,
    },
    /** @augments {String} Button's label */
    label: {
      type: String,
      default: null,
    },
    /** @augments {String} alt - title (seo) of the link */
    alt: {
      type: String,
      default: null,
    },

    // // @todo add theme data if needed
    // /** @augments {Bool} if true, rounded button with border */
    // rounded: {
    //   type: Boolean,
    //   default: null,
    // },
    // classic: {
    //   type: Boolean,
    //   default: null,
    // },

    // //  @todo use type props within some constants
    // /** @augments {Bool} check if button is for email */
    // mailto: {
    //   type: Boolean,
    //   default: false,
    // },
    // /** @augments {Bool} check if button is for phone call */
    // tel: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  computed: {
    tag() {
      if (this.to) {
        return 'router-link';
      }
      if (this.action) {
        return 'button';
      }
      if (this.src && this.type === 'internal') {
        return 'router-link';
      }
      return 'a';
    },
    _href() {
      if (this.href) {
        return this.href;
      }
      if (this.src && this.type === 'external') {
        return this.src;
      }
      return null;
    },
    _to() {
      if (this.to) {
        return this.to;
      }
      if (this.src && this.type === 'internal') {
        return this.src;
      }
      return null;
    },
    _target() {
      if (this.href) {
        return '_blank';
      }
      return null;
    },
    _attr() {
      const props = {
        to: this._to, // eslint-disable-line no-underscore-dangle
        href: this._href, // eslint-disable-line no-underscore-dangle
        target: this._target, // eslint-disable-line no-underscore-dangle
      };

      return props;
    },
  },
  methods: {
    doAction(event) {
      this.$emit('click');
      if (this.tag !== 'button' || !this.action) {
        return null;
      }
      event.preventDefault();
      return this.action();
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    v-bind="_attr"
    :title="alt"
    class="UiButton"
    @click="doAction">
    <slot>
      <span
        ref="Label"
        class="label"
        v-html="label" />
    </slot>
  </component>
</template>
<style lang="stylus" scoped>
  /**
  *
  * TABLE OF CONTENT
  * --------
  * =LAYOUT
  * =DEBUG
  */
  /* ===LAYOUT=== */
  .UiButton
    position relative
    cursor pointer
    display inline-block
    border none
    background none

    border 2px solid
    padding 0.1em 0.2em

  /* ===DEBUG=== */
</style>
