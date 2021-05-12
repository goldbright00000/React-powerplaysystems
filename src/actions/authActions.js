import http from "../config/http";
import { URLS } from "../config/urls";
import { CONSTANTS } from "../utility/constants";
import { getLocalStorage, printLog, setLocalStorage } from "../utility/shared";
import jwtDecode from "jwt-decode";

export const AUTH_LOADING = "[AUTH] AUTH LOADING";
export const GET_AUTH = "[AUTH] GET AUTH";
export const RESET_AUTH = "[AUTH] RESET AUTH";
export const SET_AUTH = "[AUTH] SET AUTH";

export function authenticate(user) {
  const request = http.post(URLS.AUTH.LOGIN, user);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) => {
      printLog(response);
      if (response.data.status === true) {
        //save in local storage.
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER, response.data.token);
      }
      return dispatch({ type: GET_AUTH, payload: response.data });
    });
  };
}

export function register(user) {
  const request = http.post(URLS.AUTH.REGISTER, user);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) =>
      dispatch({ type: GET_AUTH, payload: response.data })
    );
  };
}

export function setupUser() {
  const token = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
  if (token) {
    const user = jwtDecode(token);
    return { type: SET_AUTH, payload: user };
  }
  return { type: "DUMMY" };
}

export function updateUser(user) {
  const request = http.put(URLS.AUTH.UPDATE_DETAILS, user);

  return (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    return request.then((response) => {
      printLog(response);
      return dispatch({ type: GET_AUTH, payload: user });
    });
  };
}

export function resetAuth() {
  return {
    type: RESET_AUTH,
  };
}
