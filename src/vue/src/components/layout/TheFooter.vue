<docs>
# TheFooter
> The footer

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheFooter',
  components: {},
  computed: {
    ...mapGetters({
      locale: 'I18n/locale',
      contact: 'Global/contact',
      socials: 'Global/socials',
    }),
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <footer class="TheFooter">
    <div class="_container">
      <div class="row">
        <div
          class="contact-card"
          itemscope
          itemtype="http://schema.org/Corporation">
          <p
            itemprop="name"
            v-html="contact.name"/>
          <div
            itemprop="address"
            itemscope
            itemtype="http://schema.org/PostalAddress">
            <p>
              <span v-html="contact.address1" />,
              <span v-html="contact.address2" />
            </p>
            <p>
              <span v-html="contact.city" />
              (<span v-html="contact.state" />)
              <span v-html="contact.postalCode" />
            </p>
          </div>
          <p>
            <span
              itemprop="telephone"
              v-html="contact.phone" />
          </p>
          <p>
            <span
              itemprop="email"
              v-html="contact.email" />
          </p>
        </div>

        <nav>
          <ul>
            <li
              v-for="item in socials"
              :key="item.name">
              <a :href="item.url">
                <font-awesome-icon :icon="['fab', item.icon]" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p
        class="copyrights">
        <span v-html="contact.name" /> &copy; <span v-html="year" />
      </p>

    </div>
  </footer>
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
  .TheFooter
    vertical-padding(10)
    f-style($size: 1.2rem)

  .row
    flexbox($align: center, $justify: space-between)

  .copyrights
    text-align center

  nav
    ul
      flexbox($align: center, $justify: space-between)

      a
        margin-left 10px
        f-style($size: 2.3rem)

  //  ===DEBUG===
  [data-debug-mode="true"] .TheFooter
    //
</style>
