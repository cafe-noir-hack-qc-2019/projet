import { take } from 'lodash';
import entries from 'assets/moc/news/entries-list';

export default {
  title: 'Home Page',
  intro: "<p>this text comes from our moc EN : `assets/moc/homepage/en.json`<br>That mean that an api call was simulated ans that result was stored in our homepage's store</p>",
  news: take(entries, 2),
};
