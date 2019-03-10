<script>
  /**
  * > **
  *
  * 
  *
  * @author Camille Boissel <boissel.camille@gmail.com>
  *
  * ---
  */
  import { mapGetters } from 'vuex';
  import { TweenMax, Power1} from 'gsap';
  import ScrollToPlugin from 'gsapPlugins/ScrollToPlugin'; // eslint-disable-line no-unused-vars


  export default {
    name: 'Bot',
    components: {},
    props: {},
    data() {
      return {
        query: null,
      }
    },
    computed: {
      ...mapGetters({
        steps: 'Bot/steps',
        isLoading: 'Bot/isLoading',
      }),
    },
    created() {
      this.$store.dispatch('Bot/START_BOT');
    },
    watch: {
      steps() {
        setTimeout(() => {
          TweenMax.to(window, 0.5, {
            scrollTo: {
              y: document.body.scrollHeight,
              autoKill: false,
            },
            // ease: Power2.easeInOut,
          });
          // TweenMax.to(window, 0.2, { y: document.body.scrollHeight } )
        }, 200);
      }
    },
    methods: {
      buttonSelect(e) {
        console.log(e.target.dataset.value)
        this.$store.commit('Bot/ADD_STEP', e.target.dataset.value)
        this.$store.dispatch('Bot/QUERY_BOT', {text: e.target.dataset.value});
        this.query = '';
        this.$refs.Input.blur();
      },
      go() {
        this.$store.commit('Bot/ADD_STEP', this.query)
        this.$store.dispatch('Bot/QUERY_BOT', {text: this.query});
        this.query = '';
        this.$refs.Input.blur();
      },
      haskeyspeech(index) {
        if (this.steps[index].speech || this.steps[index].speech === '' ) return true
        return false
      },
      messagewithchoices(index) {
        return this.steps[index].messages[0].speech
      },
      choices(index) {
        return this.steps[index].messages[1].replies
      },
      slideIn(el, done) {
        TweenMax.fromTo(el, 0.2, { opacity: 0, x: -30}, { opacity: 1, x: 0, delay: 0.5, onComplete: done} )
      },
      slideOut(el, done) {
        TweenMax.to(el, 0.3, { opacity: 0, x: -30, onComplete: done})
      }
    },
  }
</script>

<template>
  <div class="Bot _container">
    <div class="container">
      <header class="header">
        <div class="logo robot"><img src="/static/boto.svg" alt=""></div>
      </header>
      <h1
        class="title">
        Que recherches tu now ?
      </h1>
      <ul class="step-list">
        <transition-group
          @enter="slideIn"
          @leave="slideOut"
          mode="out-in"
          @css="false">
          <li v-for="(step, index) in steps" :key="index">
            <div class="bot-helper" v-if="haskeyspeech(index)">
              <div class="icon bot"></div>
              <div v-if="step.speech === ''">
                <div class="info-bulle" v-html="messagewithchoices(index)" />
                <ul>
                  <button :data-value="item" v-for="item in choices(index)" :key="item" v-html="item" @click="buttonSelect"></button>
                </ul>
              </div>
              <div class="info-bulle" v-html="step.speech" v-else />
            </div>
            <div class="user-response" v-else >
              <div class="info-bulle" v-html="step"></div>
            </div>
          </li>
          </transition-group>
      </ul>
      <!-- <div v-if="isLoading">...</div> -->

      <div class="input-container">
        <input ref="Input" class="input" type="text" v-model="query" @keyup.enter="go" />
      </div>
      <button class="btn-send" @click="go">Go</button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  /**
  * 
  * TABLE OF CONTENT
  * --------
  *	=LAYOUT
  *	=DEBUG
  */

  /* ===LAYOUT=== */
  .Bot
    height 100%
    overflow hidden

  .input-container
    .input
      box-shadow none
      text-align left
      text-transform lowercase
      f-size(1.4rem 1.4rem)
  .btn-send
    margin-bottom 60px

  .user-response
    .info-bulle
      margin 30px 0 0 auto
      background rgb(217, 232, 213)

  .step-list
    width 100%
  /* ===DEBUG=== */

</style>
