import * as actionTypes from '../actionTypes/translatorActionTypes';

const initialState = {
    word: '',
    translations: [],
    from: 'en',
    to: 'ru'
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.LOAD_TRANSLATIONS_SUCCEEDED:
            return {
                ...state,
                translations: action.translations,
                word: action.word
            };
        default:
            return state;
    }
};