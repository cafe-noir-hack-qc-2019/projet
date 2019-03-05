/**
 * Page builder moc datas
 */
import faker from 'faker';

export const title = {
  component: 'title',
  data: {
    title: faker.lorem.words(),
    style: 'bold',
  },
};

export const quote = {
  component: 'quote',
  data: {
    quote: faker.lorem.sentence(),
    author: faker.name.findName(),
    source: faker.internet.url(),
  },
};

export const spacer = {
  component: 'spacer',
  data: {
    size: 'triple',
  },
};

export default [
  { ...title },
  { ...spacer },
  { ...quote },
  { ...title },
];
