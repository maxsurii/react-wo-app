import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as maxapi from "../../util/MaximoAPI";

export const loadWorkOrders = (auth, queryParams) => dispatch => {
  const authHeader = auth.authHeader;
  dispatch(setWorkOrderLoading(true));
  axios
    .get(
      maxapi.getUrl(null, "/oslc/os/mxapiwodetail", auth, queryParams),
      authHeader
    )
    .then(resp => {
      console.log("Successfully fetched work orders from Maximo");
      console.log(resp.data);
      dispatch({
        type: actionTypes.LOAD_WORKLIST,
        payload: {
          totalPages: resp.data.responseInfo.totalPages,
          totalRecords: resp.data.responseInfo.totalCount,
          worklist: resp.data.member,
          lastResponse: resp
        }
      });
    })
    .catch(err => {
      console.log(`woActions.loadWorkOrders failed with ${err}`);
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err
      });
    });
};

export const fetWorkOrderDetail = woId => dispatch => {
  axios
    .get(`/oslc/os/mxwo/${woId}`)
    .then(res => {
      dispatch({
        type: actionTypes.LOAD_WORKDETAILS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`woActions.fetWorkOrderDetail failed with ${err}`);
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err
      });
    });
};

const setWorkOrderLoading = isLoading => {
  return {
    type: actionTypes.WORK_LOADING,
    payload: isLoading
  };
};
