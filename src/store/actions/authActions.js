import * as actionTyoes from "./actionTypes";
import { axiosInstance } from "../../util/axios";

export const login = (username, password) => dispatch => {
  const loginHeaders = {
    headers: {
      properties: "*",
      maxauth: btoa(`${username}:${password}`)
    }
  };
  axiosInstance
    .post("/oslc/login", "", loginHeaders)
    .then(res => {
      console.log("Successfully logged in with Axios");
      console.log(res.data);
    })
    .catch(err => {
      console.log("Login failed");
      dispatch({
        type: actionTyoes.GET_ERRORS,
        payload: err
      });
    });
};
