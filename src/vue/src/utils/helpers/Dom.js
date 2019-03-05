/**
 * # Dom helpers
 * > Some utilities about dom selectors
*/
export default class DomHelper {
  /**
  * Get all DOM element up the tree that contain a class
  * @param  {Node} elem The base element
  * @param  {String} selector The class
  * @return {Array} Null if no match
  */
  static getParents(elem, parentSelector) {
    let selector = parentSelector;

    // If no selector defined will bubble up all the way to *document*
    if (selector === undefined) {
      selector = document;
    }

    let parents = null;
    let p = elem.parentNode;

    while (p.classList) {
      const o = p;

      if (o.classList.contains(selector.substr(1))) {
        if (!parents) {
          parents = [];
        }
        parents.push(o);
      }

      p = o.parentNode;
    }

    return parents[0];
  }

  /**
  * retrieve the y position of an element
  * @returns {Number} y position (in px)
  * @param {DOMElement} el - your dom element
  */
  static getY(el) {
    // const scrollTop = window.pageYOffset
    const { scrollTop } = document.querySelector('.the_page');
    return el.getBoundingClientRect().top + scrollTop;
  }

  /**
  * retrieve the y position of an element
  * @returns {Number} y position (in px)
  * @param {DOMElement} el - your dom element
  */
  static getNode(el, parentNode = document) {
    if (!el) {
      return null;
    }
    if (DomHelper.isNode(el)) {
      return el;
    }

    return parentNode.querySelector(el);
  }

  /**
  * @returns {Array} nodelist in array instead of nodeList
  * @param {[]HTMLElement} nodelist - eg document.querySelectorAll('.Selector')
  */
  static nodelistToArray(nodelist) {
    return Array.prototype.slice.call(nodelist);
  }

  /**
  * @returns {Boolean} true if it's a DOM node
  * @param {*} node to test
  */
  static isNode(o) {
    return typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
  }

  /**
  * @returns {Boolean} true if it's a DOM element
  * @param {*} node to test
  */
  static isElement(o) {
    return typeof HTMLElement === 'object' ? o instanceof HTMLElement : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'; // DOM2
  }
}
