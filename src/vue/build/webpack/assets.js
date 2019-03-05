import WebpackHelper from './_helper';

export default {
  module: {
    rules: [
      /** ## SVG loaders
      * use `?inline` to load an svg inline or would use file-loader (url)
      *
      * @exemple: ```
      *  import Svg from 'path/to/image.svg?inline' // use svg-inline-loader
      *  url('path/to/image.svg') // use svg-inline-loader
      * ```
      *
      * @todo test :
      *
      * - [ ] include inline or not
      * - [ ] include from url
      * - [ ] include common for both
      *
      * @see https://webpack.js.org/loaders/svg-inline-loader/
      * @see https://webpack.js.org/configuration/module/#rule-resourcequery
      */
      {
        test: /\/*.svg$/,
        include: WebpackHelper.DIRS.SRC,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.svg?inline
            loader: 'svg-inline-loader',
            options: {
              removeTags: true,
              removingTags: ['title', 'desc'],
              warnTags: ['defs', 'style'],
              classPrefix: true,
              idPrefix: true,
            },
          },
          {
            loader: 'vue-svg-loader',
            resourceQuery: /vue/, // foo.svg?vue
          },
          {
            loader: 'file-loader',
            options: {
              name: `svg/[name]${WebpackHelper.HASH}.svg`,
            },
          },
        ],
      },

      /** convert all sprite.*.svg to a single sprite */
      {
        test: /\/sprite.*.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          prefixize: true,
          name: `[name]${WebpackHelper.HASH}.[ext]`,
        },
        include: WebpackHelper.DIRS.ASSETS,
      },

      /** load default assets */
      ...WebpackHelper.genarateFileLoaders({
        font: /\.(woff(2)?|eot|ttf)$/,
        images: /\.(png|jpg|gif)$/,
        video: /\.(webm|mp4)$/,
        audio: /\.(mp3|wav)$/,
        zip: /\.(zip)$/,
      }),
    ],
  },
};
