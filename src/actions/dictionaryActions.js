import * as actionTypes from '../actionTypes/dictionaryActionTypes';

export function addWord(word, translations) {
    return {
        type: actionTypes.ADD_WORD,
        word,
        translations
    };
}