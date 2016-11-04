/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../actionTypes/translatorActionTypes';

export function loadTranslations(word) {
  return {
    type: actionTypes.LOAD_TRANSLATIONS,
    word
  };
}
