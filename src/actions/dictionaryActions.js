import * as actionTypes from '../actionTypes/dictionaryActionTypes';

export function addWord(word, translation, languageFrom, languageTo) {
  return {
    type: actionTypes.ADD_WORD,
    word,
    translation,
    languageFrom,
    languageTo
  };
}

export function loadDictionary() {
  return {
    type: actionTypes.LOAD_DICTIONARY
  };
}
