/**
 * init modernizr
 * + detect devices with Detectizr
 *
 * @todo :
 * - [ ] implement [this](https://www.npmjs.com/package/modernizr-webpack-plugin)
 */
import 'utils/vendors/modernizr';
import Detectizr from 'utils/vendors/detectizr';

const Modernizr = window.Modernizr // eslint-disable-line

Detectizr.detect({
  // option for enabling HTML classes of all features (not only the true features) to be added
  addAllFeaturesAsClass: false,
  // option for enabling detection of device
  detectDevice: true,
  // option for enabling detection of device model
  detectDeviceModel: true,
  // option for enabling detection of screen size
  detectScreen: false,
  // option for enabling detection of operating system type and version
  detectOS: true,
  // option for enabling detection of browser type and version
  detectBrowser: true,
  // option for enabling detection of common browser plugins
  detectPlugins: false,
});

const { device, os, browser } = Detectizr;
export default {
  device, os, browser, ...Modernizr,
};
