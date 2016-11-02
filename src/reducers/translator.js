import * as actionTypes from '../actionTypes/translatorActionTypes';
import * as authActionTypes from '../actionTypes/authActionTypes';

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
        case authActionTypes.LOGIN_SUCCEEDED:
        case authActionTypes.LOGOUT_SUCCEEDED:
            return {
                ...initialState
            };
        default:
            return state;
    }
};