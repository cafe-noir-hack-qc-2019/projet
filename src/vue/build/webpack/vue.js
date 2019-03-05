import { VueLoaderPlugin } from 'vue-loader';
import WebpackHelper from './_helper';

export default {
  resolve: {
    extensions: ['.vue'],
    alias: {
      plugins: `${WebpackHelper.DIRS.SRC}plugins`,
      store: `${WebpackHelper.DIRS.SRC}store`,
      router: `${WebpackHelper.DIRS.SRC}router`,
      routes: `${WebpackHelper.DIRS.ROOT}src/routes.json`,
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          },
        },
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
