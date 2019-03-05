import WebpackMerge from 'webpack-merge';
import baseConfig from './webpack/base';
import vueConfig from './webpack/vue';
import generateJsConfig from './webpack/javascript';
import generateCssConfig from './webpack/styles';
import WebpackHelper from './webpack/_helper';

const jsConfig = generateJsConfig({
  babel: true,
  eslint: true,
});

const cssConfig = generateCssConfig({
  stylus: true,
  includeCSSPaths: [
    `${WebpackHelper.DIRS.NODE_MODULES}swiper/dist/css/`,
  ],
});

/* build our filan config */
const finalConfig = WebpackMerge(
  vueConfig, // on top so resolve.extentions begins with .vue
  baseConfig,
  jsConfig,
  cssConfig,
);
module.exports = finalConfig;
