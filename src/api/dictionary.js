import callApi from './callApi';

export function loadTranslations() {
  return callApi(
    'http://localhost:3000/translations',
    'GET',
    null,
    true);
}

export function addTranslation(word, translation, languageFrom, languageTo) {
  return callApi(
    'http://localhost:3000/translations',
    'POST',
    JSON.stringify({
      word,
      translation,
      languageFrom,
      languageTo
    }),
    true);
}
