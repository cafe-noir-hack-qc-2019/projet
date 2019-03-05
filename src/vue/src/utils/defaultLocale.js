import BrowserLanguage from 'in-browser-language';
import Cookies from 'js-cookie';
import settings from 'src/settings';
import { /* map, */ head } from 'lodash';


// Cookies.remove(settings.cookies.lang)

const defaultLocale = (() => {
  const fromCookie = Cookies.get(settings.cookies.locale);
  if (fromCookie) return fromCookie;
  // if en / fr
  return BrowserLanguage.pick(settings.locales, head(settings.locales));
  // if en-ca / fr-ca
  // const langs = map(settings.locales, locale => locale.replace('-ca', ''));
  // return `${BrowserLanguage.pick(langs, head(langs))}-ca`;
})();

export default defaultLocale;
