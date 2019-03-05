<docs>
#Picture
> *Simple way to manage different sources with a `<picture>` tag*

you'll just have to bon the whole image data
`<Picture v-bind="image" />`

@todo:
- object-fit-position when we know interest point data format
  - don't forget ie polyfill css


---
@author Nicolas Husson <nicolas@kffein.com>
</docs>


<script>
import { get, map, random } from 'lodash';
import objectFitImages from 'object-fit-images';
// import LazyLoad from 'VanillaLazyload';
// import Store from 'utils/Store';

export default {
  name: 'Picture',
  props: {
    meta: {
      type: Object,
      default: () => ({
          title: null,
        }),
    },
    src: {
      type: String,
      default: null,
    },
    images: {
      type: Object,
      default: () => ({
          optimized: {
            standard: {},
            webp: {},
          },
          original: {
            url: null,
            sizes: {
              width: null,
              height: null,
            },
          },
        }),
    },
    classes: {
      type: String,
      default: null,
    },
    cover: {
      type: String,
      default: null,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: null,
    },
    debug: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development' && false,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    srcset() {
      if (this.debugImage) {
        return {
          webp: this.debugImage,
          standard: this.debugImage,
        };
      }

      const computeSrcSet = (type) => {
        const images = get(this.images, `optimized.${type}`, {});
        return map(images, (image, width) => `${image} ${width}w`).join(', ');
      };

      return {
        webp: computeSrcSet('webp'),
        standard: computeSrcSet('standard'),
      };
    },
    _src() {
      return this.debugImage || this.src || get(this.images, 'original.url');
    },
    /**
     * @argument {URI} debugImage - if debug mode, return fake image
     */
    debugImage() {
      if (this.debug) {
        return `https://picsum.photos/800/600/?image=${random(100)}`;
      }
      return null;
    },
  },
  watch: {
    loaded: {
      immediate: true,
      handler(loaded) {
        if (!loaded) {
          return;
        }
        if (this.cover) {
          this.applyCoverPolyfill();
        }
      },
    },
  },
  mounted() {
    const unwatchSrc = this.$watch('_src', (src) => {
      if (!src) {
        return;
      }

      this.$nextTick(unwatchSrc);

      if (!this.lazy) {
        this.loaded = true;
        return;
      }
      this.lazyload();
    }, {
      immediate: true,
    });
  },
  methods: {
    applyCoverPolyfill() {
      if (!this.$refs.Image) {
        return;
      }
      objectFitImages(this.$refs.Image);
    },
    /**
     * lazyload image, then set loaded to true
     * @param {function} onLoaded - callback on load, please assign this.loaded = true to show image
     */
    lazyload(onLoaded) { // eslint-disable-line
      // const callback_load = onLoaded || (() => { // eslint-disable-line camelcase
      //   this.loaded = true;
      // });

      // const lazyloader = new LazyLoad({
      //   container: this.scrollContainer,
      //   elements_selector: '[data-lazy="true"] img',
      //   callback_load,
      //   // load_delay: 600,
      // });
      // return lazyloader;
    },
  },
};
</script>

<template>
  <picture
    :class="classes"
    :data-cover="cover"
    :data-overlay="overlay"
    :data-full="full"
    :data-lazy="lazy"
    :data-loaded="loaded"
    :data-transition="transition"
    class="ui-picture ui-media">
    <template v-if="lazy">
      <source
        :data-srcset="srcset.webp"
        sizes="100vw"
        type="image/webp" >
      <img
        ref="Image"
        :alt="meta.title"
        :data-src="_src"
        :data-srcset="srcset.standard"
        class="image media"
        sizes="100vw" >
      <div class="preloader"/>
    </template>
    <template v-else>
      <source
        :srcset="srcset.webp"
        sizes="100vw"
        type="image/webp" >
      <img
        ref="Image"
        :alt="meta.title"
        :src="_src"
        :srcset="srcset.standard"
        class="image media"
        sizes="100vw" >
    </template>
  </picture>
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
  [data-cover="cover"]
  [data-cover="contain"]
    position relative
    .image
      absolute 0
      size 100%

  [data-cover="cover"]
    .image
      object-fit cover
  [data-cover="contain"]
    .image
      object-fit contain

  [data-overlay]
    &:before
      content ''
      absolute 0
      z-index 2
      background-color rgba($c-black, 0.3)

  /* ===DEBUG=== */

</style>
