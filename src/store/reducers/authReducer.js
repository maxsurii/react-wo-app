import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../util/utility";

const initialState = {
  host: "http://localhost:9080/maximo",
  isAuthenticated: false,
  loading: false,
  authHeader: {}
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action; // destructure; const type = action.type; const payload = action.payload

  switch (type) {
    case actionTypes.LOGIN:
      return updateObject(state, { loading: false, isAuthenticated: true });
    case actionTypes.STORE_USER_DETAILS:
      return updateObject(state, {
        loading: true,
        authHeader: payload.authHeader,
        host: payload.host
      });
    default:
      return state;
  }
};

export default reducer;
