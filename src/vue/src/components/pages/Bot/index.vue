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

      }
    },
    computed: {
      ...mapGetters({
        categories: 'App/categories',
      }),
    },
    created() {
      this.$store.dispatch('App/GET_CATEGORIES');
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
