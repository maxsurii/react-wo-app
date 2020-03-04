import * as actionTypes from "../actions/actionTypes";

const initialState = {}; // containing only errors returned by calling process

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
