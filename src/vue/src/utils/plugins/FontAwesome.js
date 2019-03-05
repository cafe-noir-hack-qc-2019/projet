/**
 * # FontAwesome icons
 * > import only needed fonts
 *
 * @use
 * import FontAwesome from 'utils/plugins/FontAwesome'
 * FontAwesome.init()
 */
import { each } from 'lodash';
import { library, dom, config } from '@fortawesome/fontawesome-svg-core';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faLinkedinIn, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

export default class FontAwesome {
  static init() {
    // Don't set this option to true, causes perf issues in FF!
    config.searchPseudoElements = false;

    const icons = [
      faTimesCircle,
      // faFile,
      faFacebookF,
      faLinkedinIn,
      faInstagram,
      faGithub,
    ];
    each(icons, (icon) => {
      library.add(icon);
    });
  }

  static search() {
    dom.watch();
  }
}
