/**
 * Page single news article
 *
 * contains the first article from entries-list
 * + some other datas (cause we fetch more datas for the single)
 * such as pagebuilder
 */
import { assign, first } from 'lodash';
import faker from 'faker';

import entries from './entries-list';
import pagebuilder from '../builder';

const article = assign({}, first(entries), {
  description: faker.lorem.paragraphs(),
  pagebuilder,
});

export default article;
