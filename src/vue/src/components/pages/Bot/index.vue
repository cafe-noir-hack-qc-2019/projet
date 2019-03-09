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
    methods: {
      go() {
        this.$store.dispatch('Bot/QUERY_BOT', this.query);
      }
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
