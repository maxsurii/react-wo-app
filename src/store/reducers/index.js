import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import woReducer from "./woReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  wostore: woReducer
});

export default rootReducer;
