/**
 * return a {Array}List of {Object}Article
 */
import {
 uniqueId, range, map, random,
} from 'lodash';
import faker from 'faker';

const titles = [
  'Streamlined dynamic hierarchy',
  'Cloned needs-based framework',
  'Down-sized regional time-frame',
  'Upgradable grid-enabled moratorium',
  'Team-oriented human-resource collaboration',
  'Customizable grid-enabled concept',
  'Open-architected bifurcated service-desk',
  'Down-sized mobile superstructure',
  'Ergonomic reciprocal extranet',
  'Operative empowering encoding',
];
const images = map(range(10), () => `https://picsum.photos/800/600/?image=${random(100)}`);
export const createArticle = (index) => {
  const title = titles[index] || faker.company.catchPhrase();
  const background = images[index] || `https://picsum.photos/800/600/?image=${random(100)}`;

  return {
    id: uniqueId('news-'),
    title,
    background,
    intro: faker.lorem.paragraph(),
    slug: faker.helpers.slugify(title.toLowerCase()),
  };
};

export default map(range(10), createArticle);

window.faker = faker;
