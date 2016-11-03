import * as actionTypes from '../actionTypes/dictionaryActionTypes';

const initialState = {
  words: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_WORD:
      return state;
    default:
      return state;
  }
};
