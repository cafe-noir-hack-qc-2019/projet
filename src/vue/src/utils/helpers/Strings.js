/**
 * # Strings helpers
 * > Some utilities about strings (capitalize etc)
 *
 * @author nicolas husson <nicolas@kffein.com>
 */

export default class StringsHelper {
  /**
   * @returns {String} 1st letter of each words capitalized
   * @param {String} string
   */
  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * @returns {String} file extention
   * @param {String} filename
   */
  static getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : '';
  }

  /**
   * @returns {String} where `\n` replaced by `<br>`
   * @param {String} string - string to format
   */
  static nl2br(string) {
    if (typeof string !== 'string') return null;

    return (string).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
  }

  /**
   * @returns {String} slugifyed
   * @param {String} string - string to format
   * @see https://gist.github.com/mathewbyrne/1280286
   */
  static slugify(text) {
    if (typeof text !== 'string') return null;

    return text.toString().toLowerCase()
      /*eslint-disable */
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
      /* eslint-enable */
  }
}
