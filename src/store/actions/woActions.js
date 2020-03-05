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

export const fetchWorkOrderDetail = (auth, woId) => dispatch => {
  const authHeader = auth.authHeader;
  const restURL = maxapi.getUrl(null, `/oslc/os/mxwo/${woId}`, auth);
  dispatch(setWorkOrderLoading(true));
  axios
    .get(restURL, authHeader)
    .then(resp => {
      console.log(resp.data);
      dispatch({
        type: actionTypes.LOAD_WORKDETAILS,
        payload: resp.data
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

export const saveWorkOrder = (auth, wo, history) => dispatch => {
  dispatch(setWorkOrderLoading(true));
  const { restURL, authHeader } = getWorkOrderPostUrl(wo, auth);
  //const restURL = getWorkOrderPostUrl(wo, auth);
  axios
    .post(restURL, wo, authHeader)
    .then(resp => {
      console.log(`WO record updated successfully${resp.data}`);
      history.push("/worklist");
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

const getWorkOrderPostUrl = (wo, auth) => {
  // If workorderid is not there means create new workorder
  let restURL = maxapi.getUrl(null, `/oslc/os/mxwo`, auth);
  let authHeader = auth.authHeader;
  if (wo.woId) {
    // If workorderid is there means save workorder
    restURL = maxapi.getUrl(null, `/oslc/os/mxwo/${wo.woId}`, auth);
    authHeader = {
      headers: { ...authHeader.headers, "x-method-override": "PATCH" }
    };
  }
  return { restURL, authHeader };
};
