import { URLS } from "../config/urls";

import axios from "axios";

export const GET_ALL_POWER_GAMES = "GET_ALL_POWER_GAMES";

export function getAllGames() {
  return (dispatch) => {
    const api = `${process.env.REACT_APP_API_URL}/${URLS.GAMES.ALL_POWER_GAMES}`;
    axios
      .get(api)
      .then((res) => {
        dispatch({
          type: GET_ALL_POWER_GAMES,
          payload: res?.data,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };
}
