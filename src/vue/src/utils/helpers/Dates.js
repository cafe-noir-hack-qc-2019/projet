/**
 * # Dates helpers
 * > Some utilities about dates
 *
 * @author nicolas husson <nicolas@kffein.com>
 */

import moment from 'moment';

export default class DatesHelper {
  /**
   * format a date within momentjs
   * @returns {String} formated date
   * @param {String} date
   * @param {String} format - like YY/MM/dd
   */
  static formatDate(date, format) {
    return moment(date).format(format);
  }

  /**
   * Validate Date string, based on format
   * @returns {String} formated date
   * @param {String} date
   * @param {String} format - like YY/MM/dd
   * @return {Boolean}
   */
  static validateDate(date, format) {
    return moment(date, format, true).isValid();
  }
}
