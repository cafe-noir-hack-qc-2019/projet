<docs>
# UIVideo
> video component full nice

@todo
- [x] poster (image not poster so covermode) + overlay
- [x] types :
  - [X] file
  - [x] youtube (native api - works within any youtube urls)
  - [x] vimeo (native api)
- [X] ScrollMagic to force stop on leave viewport
- [ ] optimisations
  - [ ] dynamic imports ('@vimeo/player', 'youtube-player', 'object-fit-videos' only if needed)
  - [ ] load video only when in screen (scrollmagic)
- [ ] annimations

https://docs.google.com/document/d/1bXtgdlEkWR0_MyfyFNzzojF6ld5imE2z5LqBC11KlCY/edit#heading=h.xxf871smrhhf

@author Nicolas Husson <nicolas@kffen.com>
</docs>

<script>
import Picture from 'components/ui/Picture';
import StringsHelper from 'utils/helpers/Strings';
import S from 'string';
// import { each } from 'lodash';
import { Scene } from 'scrollmagic';
import { mapGetters } from 'vuex';
// @todo dynamic conditional imports
import ObjectFitVideos from 'object-fit-videos';
import VimeoPlayer from '@vimeo/player';
import YouTubePlayer from 'youtube-player';

const VIDEO_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
};
const VIDEO_PLATFOMS = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
};

export default {
  name: 'UIVideo',
  components: { Picture },
  props: {
    src: {
      type: String,
      default: null,
      required: true,
    },
    poster: {
      type: [String, Object],
      default: null,
    },
    type: {
      type: String,
      default: VIDEO_TYPES.INTERNAL,
    },
    cover: {
      type: String,
      default: 'cover', // cover, contain or null
    },
    // bellow = video options
    loop: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    muted: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      VIDEO_TYPES,
      VIDEO_PLATFOMS,
      player: null, // video embed player (vimeo/youtube)
      /**
       * component state sync within video playback events
       * if we do a play action, it may take time for video to actualy play (buffer etc)
       * and once it's playing, it trigger some events, that will update our state :)
       */
      state: {
        playing: false,
        muted: false,
        ended: true,
        loaded: true, // @todo preload
      },
      /**
       * events handlers for playbacks events
       * sync playback with component state and emit some events
       */
      handlers: {
        play: () => {
          this.state.playing = true;
          this.state.ended = false;
          this.$emit('play');
        },
        pause: () => {
          this.state.playing = false;
          this.$emit('pause');
        },
        stop: () => {
          this.state.playing = false;
          this.state.ended = true;
          this.$emit('ended');
        },
        youtubeStateChange: (event) => {
          // https://developers.google.com/youtube/iframe_api_reference#onStateChange
          switch (event.data) {
            case 1: // playing
              return this.handlers.play();
            case 2: // paused
              return this.handlers.pause();
            case 0: // ended
              return this.handlers.stop();
            default:
              return null;
          }
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      viewport: 'Interface/viewport',
    }),
    /** @return {Object} style of our play button
     * not intended to be generic, kffein site specific stuff
     */
    actionStyles() {
      return {
        color: 'white',
        backgroundColor: '#944bf6',
      };
    },
    /**
     * @return {String} video format ('videp/mp4') based on file extension
     * or 'youtube' | 'vimeo'
     */
    format() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        if (typeof (this.src) !== 'string' || this.src === '') return null;
        return `video/${StringsHelper.getFileExtension(this.src)}`;
      }

      if (S(this.src).contains('youtube') || S(this.src).contains('youtu.be')) {
        return VIDEO_PLATFOMS.YOUTUBE;
      }
      if (S(this.src).contains('vimeo')) {
        return VIDEO_PLATFOMS.VIMEO;
      }

      return null;
    },
  },

  mounted() {
    // sync state with props
    this.state.muted = this.muted;

    if (this.type === VIDEO_TYPES.EXTERNAL) {
      this.initEmbedPlayer();
    }
    this.addPlaybackListeners();
    this.applyCoverPolyfill();

    setTimeout(this.initScrollMagic.bind(this), 1000);
  },
  beforeDestroy() {
    // @todo destroy YTPlayer and listeners
    this.removePlaybackListeners();
  },
  methods: {
    /** play video
     * @returns Promise
     */
    play() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        return this.$refs.Video.play();
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.playVideo();
        case VIDEO_PLATFOMS.VIMEO:
          return this.player.play();
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** pause video
     * @returns Promise
     */
    pause() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        return this.$refs.Video.pause();
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.pauseVideo();
        case VIDEO_PLATFOMS.VIMEO:
          return this.player.pause();
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** stop video
     * @returns Promise
     */
    stop() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.pause();
        const { duration } = this.$refs.Video;
        if (!Number.isNaN(duration)) {
          this.$refs.Video.currentTime = duration;
        }
        return new Promise((resolve) => {
          resolve();
        });
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          return this.player.stopVideo();
        case VIDEO_PLATFOMS.VIMEO:
          // no stop so seek to end (and pause ?)
          return this.player.getDuration()
          .then((duration) => {
            // this.player.pause();
            this.player.setCurrentTime(duration);
            return this.player();
          });
        default:
          return new Promise((resolve, reject) => {
            reject(new Error('incorrect video url'));
          });
      }
    },
    /** mute video
     * @param {Boolean} muted - if false, unmute video - but default to true
     * @returns void
     */
    mute(muted = true) {
      this.state.muted = muted;
    },
    /** unmute video
     * @returns void
     */
    unmute() {
      this.state.muted = false;
    },

    /** add playback listener - and emit events based on those
     * actually only for internal videos - YT player will also watch is state change
     * @returns void
     */
    addPlaybackListeners() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.addEventListener('play', this.handlers.play); // playing
        this.$refs.Video.addEventListener('pause', this.handlers.pause);
        this.$refs.Video.addEventListener('ended', this.handlers.stop);
      }

      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          this.player.on('stateChange', this.handlers.youtubeStateChange);
          break;
        case VIDEO_PLATFOMS.VIMEO:
          this.player.on('play', this.handlers.play);
          this.player.on('pause', this.handlers.pause);
          this.player.on('ended', this.handlers.stop);
          break;
        default:
          break;
      }
    },
    /** remove playback listeners */
    removePlaybackListeners() {
      if (this.type === VIDEO_TYPES.INTERNAL) {
        this.$refs.Video.removeEventListener('play', this.handlers.play);
        this.$refs.Video.removeEventListener('pause', this.handlers.pause);
      }
    },

    /** apply cover polyfill
     * if needed (cover + ie) only on INTERNAL videos
     * @todo import polyfill only if needed
     */
    applyCoverPolyfill() {
      if (this.type !== VIDEO_TYPES.INTERNAL) return;

      this.$watch('cover', (cover) => {
        if (!cover || !this.$refs.Video) return;
        ObjectFitVideos(this.$refs.Video);
      }, {
        immediate: true,
      });
    },

    /** init embed player (youtube/vimeo) */
    initEmbedPlayer() {
      switch (this.format) {
        case VIDEO_PLATFOMS.YOUTUBE:
          const id = this.getYoutubeVideoID(this.src); // eslint-disable-line no-case-declarations
          this.player = YouTubePlayer(this.$refs.Video);
            // .loadVideoByUrl(this.src); // expect very specific format
          this.player.loadVideoById(id);
          break;
        case VIDEO_PLATFOMS.VIMEO:
          this.player = new VimeoPlayer(this.$refs.Video, {
            url: this.src,
            loop: this.loop,
            autoplay: this.autoplay,
            muted: this.muted,
          });
          break;
        default:
          break;
      }

      if (this.autoplay) {
        this.play();
      }
    },

    /**
     * @return {String} youtube video id
     */
    getYoutubeVideoID(url) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : false;
    },

    /**
     * init scrollmagic to autostop video when off screen
     */
    initScrollMagic() {
      const duration = this.viewport.height + this.$el.offsetHeight;
      const scene = new Scene({
        triggerElement: this.$el,
        duration,
        triggerHook: 1,
      })
      .on('leave', this.stop.bind(this));
      this.$store.dispatch('ScrollMagic/ADD_SCENE', { scene, indicators: true });

      this.$watch('viewport', (viewport) => {
        scene.duration(viewport.height + this.$el.offsetHeight);
      });
    },
  },
};
</script>

<template>
  <div class="UIVideo">
    <slot name="actions">
      <div
        v-if="state.ended"
        class="actions">
        <button
          :style="actionStyles"
          class="btn play"
          @click.prevent="play"
          v-text="$t('play')"/>
      </div>
    </slot>

    <Picture
      v-if="state.ended || !state.loaded"
      ref="Poster"
      v-bind="poster"
      cover="cover"
      class="poster"/>

    <video
      v-if="type === VIDEO_TYPES.INTERNAL"
      ref="Video"
      :loop="loop"
      :muted="state.muted"
      :autoplay="autoplay"
      :controls="controls"
      :data-cover="cover"
      class="video"
      controlsList="nodownload">
      <source
        :src="src"
        :type="format">
    </video>

    <div
      v-else
      ref="Video"
      class="video -embed"/>

    <span
      ref="SM_END"
      class="sm -end"/>
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
  .UIVideo
    position relative
    width 100%
    background $black

  .actions
  .poster
  .video
  >>> iframe
    absolute 0
    size 100%


  .video
  >>> iframe
    z-index 10

  [data-cover='cover']
    object-fit cover
    font-family 'object-fit:cover;'
  [data-cover='contain']
    object-fit contain
    font-family 'object-fit:contain;'


  .poster
    z-index 20

  .actions
    z-index 30
    flexbox(center)
    &:before
      content ''
      absolute 0
      background-color rgba($black, 0.8)
    .btn
      position relative

  .btn.play
    border-radius 50%
    fontstyle(title, $lh:0, $size:2rem)
    size 120px

  .sm
    position absolute
    &.-end
      bottom 0

  //  ===DEBUG===
  // [data-debug-mode="true"] .UIVideo
  //   background url('./_debug/desktop.jpg') top left no-repeat
  //   .actions:before
  //     opacity 0
  //   .poster
  //   .video
  //     opacity .2
</style>

<i18n>
{
  "fr": {
    "play": "Jouer"
  },
  "en": {
    "play": "Play"
  }
}
</i18n>
