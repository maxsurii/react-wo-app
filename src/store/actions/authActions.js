import * as actionTyoes from "./actionTypes";
import axios from "axios";
import * as maxapi from "../../util/MaximoAPI";

export const login = (username, password, host) => dispatch => {
  const loginHeaders = {
    headers: {
      properties: "*",
      maxauth: btoa(`${username}:${password}`)
    }
  };
  dispatch(storLoginCredentils(host, loginHeaders));
  axios
    .post(maxapi.getUrl(host, "/oslc/login", null), "", loginHeaders)
    .then(res => {
      console.log("Successfully logged in with Axios");
      console.log(res.data);
      dispatch({
        type: actionTyoes.LOGIN
      });
    })
    .catch(err => {
      console.log("Login failed");
      dispatch({
        type: actionTyoes.GET_ERRORS,
        payload: err
      });
    });
};

const storLoginCredentils = (host, loginHeaders) => {
  return {
    type: actionTyoes.STORE_USER_DETAILS,
    payload: {
      host: host,
      authHeader: loginHeaders
    }
  };
};

export const logoutUser = () => {
  return {
    type: actionTyoes.LOGOUT
  };
};
