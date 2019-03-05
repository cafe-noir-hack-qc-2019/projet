<docs>
# Our (pre)Loader
> display some loader during the loading (compoennt, globales, api etc)

@todo :
- async component : https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
</docs>

<script>
  /* eslint-disable */
  import { forEach, indexOf, filter } from 'lodash';
  import { TimelineMax, TweenMax, Elastic, Back } from 'gsap';
  import Preloader from 'preload-js';
  import axios from 'axios'
  
  // const modeBuild = (process.env.NODE_ENV === 'production') ? 'build' : 'dev';

  let DEBUG_IGNORE_LOADER = (process.env.NODE_ENV === 'development') && false
  // DEBUG_IGNORE_LOADER = true
  /**
   * > *The preloader* 
   *
   * @todo
   *  hide logo like translate in white mask
   *  show logo in header same way
   * @author Nicolas Husson <nicolas@kffein.com>
   * ---
   */
  export default {
    name: 'TheLoader',
    data() {
      return {
        $preloader: null,
        resolveLoader: null,
        manifest: [],
        ignore: ['js', 'css', 'mp4', 'webm', 'mp3', 'wav', 'zip', 'pdf', 'png', 'jpg', 'gif'],
        timeline: null,
      };
    },
    computed: {
      promises() {
        return this.$store.getters['Loader/promises'];
      },
    },
    created() {
      this.$preloader = new createjs.LoadQueue();
      axios.get(`manifest.json`, { baseURL: '/' }).then(res => this.load(res.data));
    },
    mounted(){
      const ease = Expo.easeOut
      
      this.timeline = new TimelineMax({
        paused: true
      })
      .add('start')
      .fromTo(this.$refs.Line, 0.2, {x: 0}, {x: '100%'})
      .add('end')
    },
    methods: {
      load(manifest) {
        this.$preloader.on('error', this._onLoadError);
        this.$preloader.on('progress', this._onLoadProgress);
        this.$preloader.on('complete', this._onLoadComplete);

        forEach(manifest, (file, key) => {
          const ext = file.substr(file.lastIndexOf('.') + 1);
          if (indexOf(this.ignore, ext) !== -1) { return; }

          // configBuild[modeBuild].assetsPublicPath + file
          this.manifest.push({ id: key, src: file });
        });

        const preloaderPromise = new Promise((resolve, reject) => {
          this.resolveLoader = resolve;
          this.$preloader.loadManifest(this.manifest);
        });

        this.$store.commit('Loader/PROMISE_PUSH', preloaderPromise);

        // this.faker(10)
        
        Promise.all(this.promises).then(this._onPromisesComplete);
      },

      faker(time) {
        const fakerPromise = new Promise((resolve, reject) => {
          TweenMax.delayedCall(time, resolve);
        });
        this.$store.commit('Loader/PROMISE_PUSH', fakerPromise);
      },

      _onLoadProgress({progress}) {
        const timeToProgress = progress * this.timeline.duration()
        this.timeline.tweenTo(timeToProgress)
      },

      _onLoadComplete(event) {
        this.resolveLoader('preloader resolded');
      },

      _onPromisesComplete(msg) {
        this.$store.commit('Loader/PROMISE_DEACTIVATE');
        this.$store.commit('Loader/LOADER_LOADED');
        // return
        // // return
        // this.$store.commit('Loader/PROMISE_DEACTIVATE');
        // // if(DEBUG_IGNORE_LOADER) {
        //   return this.$store.commit('Loader/LOADER_LOADED');
        // // }        
      },

      leave(el, done) {
        if(this.timeline.progress() === 1){
          return this.$nextTick(done)
        }
        return this.timeline.eventCallback('onComplete', done)
        // TweenMax.to(this.$el, 0.8, {
        //   x: '90%',
        //   ease:Expo.easeIn,
        //   onComplete:done
        // })
      },

      _onLoadError(event, a, b, c) {
        console.warn('ERROR IN LOADER', event, a, b, c);
      },
    },
  };
</script>

<template>
  <transition name="loader" :css="false" @leave="leave" appear>
    <div id="TheLoader">
      <div ref="Line" class="line"></div>
    </div>
  </transition>
</template>

<style lang="stylus" scoped>
.line
  fixed top left right
  height 5px
  background $c-black
</style>
