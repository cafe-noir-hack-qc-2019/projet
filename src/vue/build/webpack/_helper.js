import path from 'path';
import { argv } from 'yargs';
import { map } from 'lodash';

class WebpackHelper {
  /**
  * @returns {Object} - all enviromnemts related stuff (is_dev, NODE_ENV etc)
  */
  static get ENV() {
    const mode = argv.mode || 'development';
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = mode;
    }
    const CURRENT = process.env.NODE_ENV;
    const NODE_ENV = `"${CURRENT}"`;

    const IS_DEV = CURRENT === 'development';
    const IS_STAGE = CURRENT === 'staging';
    const IS_PROD = CURRENT === 'production';

    const BUILD = argv.build || IS_PROD;

    return {
      NODE_ENV, CURRENT, IS_DEV, IS_STAGE, IS_PROD, BUILD,
    };
  }

  /**
  * @returns {Object} - main dirs (root, public etc)
  */
  static get DIRS() {
    const ROOT_STACK = path.join(__dirname, '../../');
    const ROOT = path.join(ROOT_STACK, '../../');

    const DIST = path.join(ROOT, 'public/');
    const PUBLIC = DIST;

    const NODE_MODULES = path.join(ROOT_STACK, 'node_modules/');
    const STATIC = path.join(ROOT_STACK, 'static/');
    const SRC = path.join(ROOT_STACK, 'src/');
    const ASSETS = path.join(SRC, 'assets/');

    return {
      ROOT,
      ROOT_STACK,
      DIST,
      PUBLIC,
      STATIC,
      SRC,
      ASSETS,
      NODE_MODULES,
    };
  }

  static get PATHS() {
    // https://webpack.js.org/configuration/output/#output-publicpath
    const PUBLIC = (({ IS_PROD, IS_STAGE }) => { // eslint-disable-line
      // if (IS_PROD) return 'https://your-host.com/production/';
      // if (IS_STAGE) return 'https://your-host.com/staging/';
      return '/';
    })(WebpackHelper.ENV);

    return {
      PUBLIC,
    };
  }

  static get HASH() {
    // return WebpackHelper.ENV.IS_PROD ? '.[hash:7]' : '';
    return '.[hash:7]';
  }

  static genarateFileLoaders(formats) {
    return map(formats, (test, dir) => ({
      test,
      loader: 'file-loader',
      options: {
        name: `assets/${dir}/[name]${WebpackHelper.HASH}.[ext]`,
      },
      include: WebpackHelper.DIRS.ASSETS,
    }));
  }

  /** serve our html file from a template
   * @param {Object} data - key/values that will be injected in our template
   *
   * Note that when dev, generate index.html, but on build, app.html
   * so no conflict with index.php
   */
  static getExtractHTMLPlugin(data = {}) {
    const filename = WebpackHelper.ENV.BUILD ? 'app.html' : 'index.html';

    const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line global-require
    return new HtmlWebpackPlugin({
      title: 'History Search',
      // filename: 'index.html',
      filename: `${WebpackHelper.DIRS.PUBLIC}${filename}`,
      template: `${WebpackHelper.DIRS.SRC}app.html`,
      inject: true,
      chunksSortMode: 'none',
      // custom datas
      ...data,
    });
  }
}

module.exports = WebpackHelper;
