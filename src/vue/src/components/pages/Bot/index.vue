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
  import { get, last } from 'lodash';


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
    mounted() {
    },
    watch: {
      steps(step) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 200);
      }
    },
    methods: {
      buttonSelect(e) {
        this.$store.commit('Bot/ADD_STEP', e.target.dataset.value)
        this.$store.dispatch('Bot/QUERY_BOT', {text: e.target.dataset.value});
        this.query = '';
        this.$refs.Input.focus();
      },
      go() {
        this.$store.commit('Bot/ADD_STEP', this.query)
        this.$store.dispatch('Bot/QUERY_BOT', {text: this.query});
        this.query = '';
        this.$refs.Input.focus();
      },
      haskeyspeech(index) {
        if (this.steps[index].speech || this.steps[index].speech === '' ) return true
        return false
      },
      messagewithchoices(index) {
        return get(this.steps, `${index}.messages.0.speech`);
      },
      choices(index) {
        return get(this.steps, `${index}.messages.1.replies`);
      },
      finalCardLink(index) {
        return get(this.steps, `${index}.messages.1.buttons.0.postback`);
      },
      finalCardImg(index) {
        return get(this.steps, `${index}.messages.1.imageUrl`);
      },
      finalCardLabel(index) {
        return get(this.steps, `${index}.messages.1.title`);
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
      <!-- <h1
        class="title">
        Ok, c’est parti!
      </h1> -->
      <ul class="step-list">
        <transition-group
          @enter="slideIn"
          @leave="slideOut"
          mode="out-in"
          @css="false">
          <li v-for="(step, index) in steps" :key="index + 0">
            <div class="bot-helper" v-if="haskeyspeech(index)">
              <div class="icon bot"></div>
              <div v-if="step.speech === ''">
                <div class="info-bulle" v-html="messagewithchoices(index)" />
                <ul v-if="choices(index)">
                  <button class="choice" :data-value="item" v-for="item in choices(index)" :key="item" v-html="item" @click="buttonSelect"></button>
                </ul>
                <a class="final-link" :href="finalCardLink(index)" v-else>
                    <img :src="finalCardImg(index)" alt="">
                    <div class="label" v-html="finalCardLabel(index)"></div>
                </a>
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
        <input ref="Input" class="input" type="text" v-model="query" placeholder="Rechercher..." @keyup.enter="go" />
      </div>
      <button class="btn-send" @click="go">Envoyer</button>
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
    width 98%
    .input
      box-shadow 0 0 3px 0px rgba(0, 0, 0, 0.2)
      text-align left
      text-transform lowercase
      f-size(1.4rem 1.4rem)
  .btn-send
    margin-bottom 60px
    width 98%


  .user-response
    .info-bulle
      margin 30px 0 0 auto
      background rgb(217, 232, 213)

  .step-list
    width 100%
  /* ===DEBUG=== */

</style>
