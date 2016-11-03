import callApi from './callApi';

export default function getTranslations(word) {
  return callApi(
    `http://localhost:3000/translate/${word}`,
    'GET',
    null,
    true);
}

