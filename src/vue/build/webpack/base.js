import { DefinePlugin } from 'webpack';
import WebpackMerge from 'webpack-merge';
import ManifestPlugin from 'webpack-manifest-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { argv } from 'yargs';
// helpers
import WebpackHelper from './_helper';
import assetsConfig from './assets';

const {
  ENV, DIRS, PATHS, HASH,
} = WebpackHelper;

const PORT = argv.port || 3000;

const config = {
  /**
   * @param {Object} entry - Which entry file(s) you need to process
   * - the key will be your builded filename (eg main.js/main.css)
   * - The value can be {String} for a single file of {Array} for many entries mixed together
   */
  entry: {
    main: [
      `${DIRS.SRC}index.js`,
      `${DIRS.ASSETS}styles/main.styl`,
    ],
  },

  /**
   * @param {Object} output - Where process build will output result
   */
  output: {
    path: DIRS.PUBLIC, // The output directory as an absolute path (path.resolve(__dirname, 'dist/assets'))
    publicPath: PATHS.PUBLIC, // public URL of the output directory ('https:/your-site/') AND MUST END WITH /
    filename: `assets/js/[name]-${HASH}.js`, // only js files, css will be in extract plugin
  },

  /**
   * @param {Object} resolve - for the lazy coders we all are ;) define aliases etc
   */
  resolve: {
    extensions: ['.js', '.styl', '.json'], // can ignore extention when import files (`import('my-component')` ~.js~ )
    alias: { // shortchut when importing files (`import('gsapPlugins/ScrollToPlugin')`)
      root: DIRS.ROOT,
      src: DIRS.SRC,
      assets: DIRS.ASSETS,
      vendors: `${DIRS.SRC}vendors`,
      utils: `${DIRS.SRC}utils`,
      components: `${DIRS.SRC}components`,

      // to work with gsap, scrollmagic and our pro plugins
      gsapPro: `${DIRS.SRC}vendors/gsap`,
      gsapPlugins: `${DIRS.NODE_MODULES}gsap/src/uncompressed/plugins`,
      TweenLite: `${DIRS.NODE_MODULES}gsap/src/uncompressed/TweenLite.js`,
      TweenMax: `${DIRS.NODE_MODULES}gsap/src/uncompressed/TweenMax.js`,
      TimelineLite: `${DIRS.NODE_MODULES}gsap/src/uncompressed/TimelineLite.js`,
      TimelineMax: `${DIRS.NODE_MODULES}gsap/src/uncompressed/TimelineMax.js`,
      ScrollMagic: `${DIRS.NODE_MODULES}scrollmagic/scrollmagic/uncompressed/ScrollMagic.js`,
      ScrollMagicPlugins: `${DIRS.NODE_MODULES}scrollmagic/scrollmagic/uncompressed/plugins`,

      // avoid build error for swiper
      SwiperJS: `${DIRS.NODE_MODULES}swiper/dist/js/swiper.js`,

      // simplify some vendors paths
      fontawesome: '@fortawesome/fontawesome',
      faIconSolid: '@fortawesome/fontawesome-free-solid/',
      faIconBrand: '@fortawesome/fontawesome-free-brands/',
    },
  },

  // @todo invest, add ie chunk with polifyl...
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
      cacheGroups: {
        // Vendors chunk which includes all code from node_modules
        vendors: {
          test: /[\\/]node_modules|vendors[\\/]/,
          name: 'vendors',
          chunks: 'all',
          // if we want to separate vendors files by their name
          // name(module) {
          //   // get the name. E.g. node_modules/packageName/not/this/part.js
          //   // or node_modules/packageName
          //   const matches = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
          //   let packageName = 'vendors';
          //   if (matches) {
          //     packageName = matches[1]; // eslint-disable-line
          //   }

          //   // npm package names are URL-safe, but some servers don't like @ symbols
          //   return packageName.replace('@', '');
          // },
        },
      },
    },
  },
  mode: ENV.CURRENT ? 'development' : 'production',
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    port: PORT,
  },
  module: {
    rules: [
      /* will be define within webpackMerges */
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: ENV.NODE_ENV,
      },
    }),
    new ManifestPlugin(),
    /**
     * copy static into assets
     * @todo clarify :
     * - [] copy to src/assets, so you can always point to assets/ even for static files
     * - [] or to public/assets because we arent supposed to import those stuff anyway
     */
    new CopyWebpackPlugin([
      {
        from: DIRS.STATIC,
        to: `${DIRS.PUBLIC}/static/${'[path][name].[ext]'}`,
        ignore: ['.*'],
      },
    ]),
    WebpackHelper.getExtractHTMLPlugin({
      environment: ENV.CURRENT,
      isLocalBuild: ENV.IS_DEV,
      assetsPath: DIRS.ASSETS,
    }),
  ],
};


const baseConfig = WebpackMerge(
  config,
  assetsConfig,
);

module.exports = baseConfig;
