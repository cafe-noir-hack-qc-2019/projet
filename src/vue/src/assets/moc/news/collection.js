/**
 * Page news collection
 *
 * contains the news list + some page datas
 */
import faker from 'faker';
import entries from './entries-list';

export default {
  title: 'News list page',
  intro: faker.lorem.sentences(),
  entries,
};
