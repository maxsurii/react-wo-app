import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../util/utility";

const initialState = {
  worklist: [],
  workdetail: {},
  error: null,
  loading: false,
  totalRecords: 0,
  totalPages: 0,
  pageSize: 50,
  page: 1
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOAD_WORKLIST:
      return updateObject(state, {
        totalPages: payload.totalPages,
        totalRecords: payload.totalCount,
        worklist: createWorkList(payload.worklist),
        loading: false
      });
    case actionTypes.LOAD_WORKDETAILS:
      return updateObject(state, {
        workdetail: payload,
        loading: false
      });
    case actionTypes.WORK_LOADING:
      return updateObject(state, {
        loading: payload
      });
    default:
      return state;
  }
};

const createWorkList = respMembers => {
  const workList = [];
  respMembers.forEach(e => workList.push(e));
  return workList;
};

export default reducer;
