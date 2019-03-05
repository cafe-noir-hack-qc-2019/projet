import { without, merge } from 'lodash';
import WebpackHelper from './_helper';

/**
 * @returns generic loaders (cause it's a big list...)
 * @param {Object} options - see code for list of options
 * @param {Boolean} options.babel - if true add babel-loader
 * @param {Boolean} options.eslint - if true add eslint-loader
 */
export default function (opts = {}) {
  const options = merge({
    babel: null,
    eslint: null,
  }, opts);

  const rules = without([
    /** eslint loader */
    (({ eslint }) => {
      if (!eslint) return null;
      const EslintFriendlyFormatter = require('eslint-friendly-formatter'); // eslint-disable-line global-require
      return {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: EslintFriendlyFormatter,
              fix: true,
            },
          },
        ],
        include: WebpackHelper.DIRS.SRC,
        exclude: [
          /node_modules/,
          `${WebpackHelper.DIRS.ASSETS}vendors`,
        ],
      };
    })(options),

    /** babel loader */
    (({ babel }) => {
      if (!babel) return null;
      return {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          WebpackHelper.DIRS.SRC,
          `${WebpackHelper.DIRS.NODE_MODULES}gsap`, // @todo test last version
        ],
        // @todo test array instead of /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        exclude: [
          `${WebpackHelper.DIRS.NODE_MODULES}dom7`,
          `${WebpackHelper.DIRS.NODE_MODULES}ssr-window`,
          `${WebpackHelper.DIRS.NODE_MODULES}swiper`,
        ],
      };
    })(options),
  ], null);

  return {
    module: {
      rules,
    },
  };
}
