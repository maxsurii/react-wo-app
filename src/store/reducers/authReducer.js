import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../util/utility";

const initialState = {
  isAuthenticated: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action; // destructure; const type = action.type; const payload = action.payload

  switch (type) {
    case actionTypes.LOGIN:
      return updateObject(state, { loading: false });
    case actionTypes.SET_LOADING:
      return updateObject(state, { loading: payload });
    default:
      return state;
  }
};

export default reducer;
