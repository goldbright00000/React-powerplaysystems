import { CONSTANTS } from "../utility/constants";
import { setLocalStorage } from "../utility/shared";
import { URLS } from "../config/urls";

import axios from "axios";
import http from "../config/http";

export const GET_ALL_GAMES = "GET_ALL_GAMES";

export function getAllGames() {
    return (dispatch) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/${URLS.GAMES.ALL_GAMES}`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_GAMES,
                    payload: res?.data,
                });
            })
            .catch((er) => {
                console.log(er);
            });
    };
}