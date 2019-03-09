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
<<<<<<< HEAD
=======

import {ApiAiClient} from "api-ai-javascript";

// import Axios from 'axios';
>>>>>>> pre bot
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
<<<<<<< HEAD
      this.$store.dispatch('Bot/START_BOT');
    },
    methods: {
      go() {
        this.$store.dispatch('Bot/QUERY_BOT', this.query);
      }
=======
      // Axios({
      //   method: 'get',
      //   url: ''
      // })
      const client = new ApiAiClient({accessToken: 'e382bdba343946bd9a56fd60b6da2368'})

      .textRequest('permis')
          .then((response) => {console.log(response)})
          .catch((error) => {console.log(error)})
>>>>>>> pre bot
    },
  }
</script>

<template>
  <div class="Bot">
    <!-- <ul>
      <li v-for="step in steps" :key="step.metadata.intentId">
        {{ step.speech }}
      </li>
    </ul>
    <div v-if="isLoading">...</div>
    <input type="text" v-model="query" />
    <button @click="go">GO</button> -->
    <iframe
        allow="microphone;"
        src="https://console.dialogflow.com/api-client/demo/embedded/9198181c-1450-4265-9221-42d0b2682498">
    </iframe>
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

  iframe 
    width 100%
    height calc('100% + 110px')
    transform translateY(-110px)

  /* ===DEBUG=== */

</style>
