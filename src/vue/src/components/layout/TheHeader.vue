<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import arrowBack from 'assets/svg/arrow-back.svg';
export default {
  name: 'TheHeader',
  components: {
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      arrowBack,
    }
  },
  computed: {
    isInfoDetail() {
      return /infoDetail/.test(this.$route.name);
    }
  },
};
</script>

<template>
  <header class="TheHeader">
    <div class="header-block">
      <a v-if="isInfoDetail" class="back" @click.prevent="$router.go(-1)">
        <img :src="arrowBack" />
      </a>
      <router-link :to="{name: `home.fr`}"  class="app-name">
        <h1>Infos 311</h1>
      </router-link>
      <div class="helper">Aide</div>

    </div>
  </header>
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
  .TheHeader
    position relative
    background white
  .header-block
    padding-top 10px
    padding-bottom 8px
  .app-name
    width 100%
    color black
    text-align center
  
  .helper
    absolute right 15px top 10px
    color $c-blue
    font-weight 600

  .back
    absolute left 15px top 10px

  //  ===DEBUG===
  [data-debug-mode="true"] .TheHeader
    //
</style>
