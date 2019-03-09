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

import {ApiAiClient} from "api-ai-javascript";

// import Axios from 'axios';
  export default {
    name: 'Bot',
    components: {},
    props: {},
    data() {
      return {

      }
    },
    computed: {
    },
    created() {
      // Axios({
      //   method: 'get',
      //   url: ''
      // })
      const client = new ApiAiClient({accessToken: 'e382bdba343946bd9a56fd60b6da2368'})

      .textRequest('permis')
          .then((response) => {console.log(response)})
          .catch((error) => {console.log(error)})
    },
    methods: {},
  }
</script>

<template>
  <div class="Bot">
    Coucou je suis le bot
    <ul>
      <li v-for="category in categories" :key="category.id">
        <span v-html="category.label"/>
      </li>
    </ul>
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

  /* ===DEBUG=== */

</style>
