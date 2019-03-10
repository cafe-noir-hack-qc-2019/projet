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
  import { get } from 'lodash';
  import collectRelated from 'assets/data/collectRelated';
  import licenceRelated from 'assets/data/licenceRelated';
  import Card from 'components/sections/Card';
  export default {
    name: 'InfoDetail',
    components: { Card },
    props: {},
    data() {
      return {
        get,
      }
    },
    computed: {
      ...mapGetters({
        info: 'App/info',
        postalCode: 'App/postalCode',
        latLng: 'App/latLng',
      }),
      isCollect() {
        return this.info.type === 'collectes';
      },
      isLicence() {
        return this.info.type === 'licences';
      },
      categorySlug() {
        return this.$route.params.categorySlug;
      },
      themeSlug() {
        return this.$route.params.themeSlug;
      },
      optionSlug() {
        return this.$route.params.optionSlug;
      },
      titleInfo() {
        if (this.isCollect) {
          return `Collecte des ${get(this.info, 'data.properties.TYPE_DECHET', '').toLowerCase()}`;
        }
        if (this.isLicence) {
          return `Optenir son permis<br/> ${this.licenceType}`;
        }
      },
      licenceType() {
        let type = '';
        switch (get(this.info, 'data.status')) {
          case 'owner':
            type = 'Propriétaire'
            break;
        
          default:
            break;
        }

        switch (get(this.info, 'data.animalType')) {
          case 'cat':
            type += ' d\'un chat';
            break;
          case 'dog':
            type += ' d\'un chien';
            break;
        
          default:
            break;
        }
        return type;
      },
      related() {
        if (this.isCollect) {
          return collectRelated;
        }
        if (this.isLicence) {
          return licenceRelated;
        }
      }
    },
    created() {
      this.$store.dispatch('App/GET_INFO', { 
        categorySlug: this.categorySlug,
        themeSlug: this.themeSlug,
        optionSlug: this.optionSlug,
      });
    },
    methods: {
      enter(el, done) {
        TweenMax.fromTo(el, 0.2, { opacity: 0, y: -20}, { opacity: 1, y: 0, onComplete: done} )
      },
      leave(el, done) {
        TweenMax.to(el, 0.3, { opacity: 0, y: 20, onComplete: done})
      }
    },
  }
</script>

<template>
  <div class="InfoDetail" v-if="info">
    <template v-if="isCollect">
      <div class="detail-header">
        <h1 v-html="titleInfo" />
        <img src="/static/fake-map.png" />
        <p v-html="postalCode" />
      </div>
      <div class="infos-block">
        <div>
          <strong>📦 Type de déchet</strong>
          <p v-html="get(info, 'data.properties.TYPE_DECHET')" />
        </div>
        <div>
          <strong>ℹ️ Infos</strong>
          <p v-html="get(info, 'data.properties.MESSAGE_FR')" />
        </div>
        <div v-if="get(info, 'data.properties.EXCEPTION_FR')">
          <strong>Exceptions</strong>
          <p v-html="get(info, 'data.properties.EXCEPTION_FR')" />
        </div>
      </div>
    </template>
    <template v-if="isLicence">
      <div class="detail-header">
        <h1 v-html="titleInfo" />
        <img src="/static/fake-dog.jpg" />
        <p v-html="postalCode" />
      </div>
      <div class="infos-block">
        <div>
          <strong>🗒 Type de permis</strong>
          <p v-html="licenceType" />
        </div>
        <div>
          <strong>ℹ️ Infos</strong>
          <p v-html="get(info, 'data.how-to-get-license')" />
        </div>
        <div>
          <strong>💰 Prix</strong>
          <p v-if="get(info, 'data.prices.extra')" v-html="get(info, 'data.prices.extra')" />
          <table>
            <tr>
              <th>Stérilisé</th>
              <th>Non Stérilisé</th>
              <th>Promotion</th>
            </tr>
            <tr>
              <td v-html="`${get(info, 'data.prices.sterilized')}$`" />
              <td v-html="`${get(info, 'data.prices.not-sterilized')}$`" />
              <td v-html="`${get(info, 'data.prices.promotion')}$`" />
            </tr>
          </table>
        </div>
        <div>
          <strong>📍 Contact</strong>
          <p>
            <span v-html="get(info, 'data.contact-address.address')" /><br />
            <span v-html="get(info, 'data.contact-address.city')" />,
            <span v-html="get(info, 'data.contact-address.postal_code')" /><br />
            <span v-html="get(info, 'data.contact-address.region')" />
          </p>
        </div>
      </div>
    </template>

    <div class="related-blocks">
      <h3>Cela pourrait vous intéresser</h3>
      <div class="list-collection">
        <transition-group
          @enter="enter"
          @leave="leave"
          mode="out-in"
          @css="false"
          tag="ul"
          class="list"
        >
          <Card :card="card" v-for="card in related" :key="card.id" />
        </transition-group>
      </div>
    </div>

    <router-link :to="{name: 'infoList.fr'}">Retour</router-link>
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
  .detail-header
    h1
      f-style('title', $level: 'h1')
      color $c-pickled-bluewood
      text-transform none
      text-align center
      vertical-padding()

    img
      display block
      width 100%

    p
      background $c-white
      color $c-dusty-gray
      text-align center
      padding 7px 0 4px
      text-transform uppercase
      border-top 1px solid #ccc
      border-bottom 1px solid #ccc

  .infos-block
    padding 25px

    strong
      display block
      f-style('title', $level: 'h2')
      color $c-pickled-bluewood
      margin-bottom 5px
    
    p
      color $c-raven
      margin-bottom 20px

    table 
      color $c-raven
      margin-bottom 20px
      
      th
        font-weight bold

      th, td
        border 1px solid $c-raven
        padding 7px 10px 3px

  .related-blocks
    padding 0 25px 25px
    h3
      f-style('title', $level: 'h1')
      flexbox('center')
      &::before
        display block
        content ''
        width 18px
        height 2px
        background $c-green
        margin-right 10px
        margin-bottom 2px

    >>> .Card
      max-width 75%
  /* ===DEBUG=== */

</style>
