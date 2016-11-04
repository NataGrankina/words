import * as actionTypes from '../actionTypes/dictionaryActionTypes';
import * as authActionTypes from '../actionTypes/authActionTypes';

const initialState = {
  translations: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_WORD_SUCCEEDED:
      return {
        ...state,
        translations: [...state.translations, action.translation]
      };
    case actionTypes.LOAD_DICTIONARY_SUCCEEDED:
      return {
        ...state,
        translations: action.dictionary
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
