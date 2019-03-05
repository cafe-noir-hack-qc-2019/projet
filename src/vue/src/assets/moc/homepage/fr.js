import { take } from 'lodash';
import entries from 'assets/moc/news/entries-list';


export default {
  title: "Page d'accueil",
  intro: "<p>Ce texte viens du moc de la home en FR : `assets/moc/homepage/fr.json`<br>ceci veux dire qu'on a fait un call api et qu'on ai stocké le resultat dans le store</p>",
  news: take(entries, 2),
};
