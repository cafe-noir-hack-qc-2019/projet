/**
 * # Key helpers
 * > Some utilities not really ordoned
 *
 * @author nicolas husson <nicolas@kffein.com>
 */
import { get } from 'lodash';

export default class KeyHelper {
  /**
   * test if keybordevent's touch related was escape
   * (cause it's harder than expected...)
   * @returns {Boolean} true if the key pressed was escape
   * @param {keyboardEvent} event - keydown/keyup and maybe keypress
   */
  static isEscapeKey(event = window.event) {
    if (!event) {
      return false;
    }

    const keycode = get(event, 'keycode');
    const key = get(event, 'key', keycode);

    switch (key) {
      case 'Escape':
      case 'Esc':
      case 27:
        return true;

      default:
        return false;
    }
  }
}
