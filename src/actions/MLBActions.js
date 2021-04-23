import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";

export const MLB_DATA = "[MLB] GET_SET_DATA";
export const MLB_LIVE_DATA = "[MLB] MLB_LIVE_DATA";
export const MLB_STAR_PLAYER_COUNT = "[MLB] STAR_PLAYER_COUNT";

const { FILTERS } = CONSTANTS;
const { P, OF, C, SS, D, XB } = FILTERS.MLB;

export function mlbData() {
  return async (dispatch) => {
    const response = await http.get(URLS.DFS.MLB);
    const { data = [] } = response.data || {};

    const mlbPlayerList = [];
    for (let i = 0; i < data?.length; i++) {
      const {
        away_team = {},
        home_team = {},
        date_time = "",
        venue = {},
        match_id = "",
      } = data[i] || {};
      const { mlb_players: awayTeamPlayers = [], name: awayTeamName = "" } =
        away_team || {};
      const { mlb_players: homeTeamPlayers = [], name: homeTeamName = "" } =
        home_team || {};
      const _awayTeamPlayersList = getPlayers(
        awayTeamPlayers,
        awayTeamName,
        homeTeamName,
        venue,
        match_id,
        date_time
      );
      const _homeTeamPlayersList = getPlayers(
        homeTeamPlayers,
        homeTeamName,
        awayTeamName,
        venue,
        match_id,
        date_time
      );
      const playersList = [..._awayTeamPlayersList, ..._homeTeamPlayersList];
      mlbPlayerList.push(...playersList);
    }

    //filter the data on the basis of types
    const filterdList = [];
    const pTypePlayers = getFilterPlayersList(P, mlbPlayerList);
    const ofTypePlayers = getFilterPlayersList(OF, mlbPlayerList);
    const cTypePlayers = getFilterPlayersList(C, mlbPlayerList);
    const ssTypePlayers = getFilterPlayersList(SS, mlbPlayerList);
    const xBTypePlayers = getFilterPlayersList(XB, mlbPlayerList);
    const dTypePlayers = getFilterPlayersList(D, mlbPlayerList);
    filterdList.push(pTypePlayers);
    filterdList.push(ofTypePlayers);
    filterdList.push(cTypePlayers);
    filterdList.push(ssTypePlayers);
    filterdList.push(xBTypePlayers);
    filterdList.push(dTypePlayers);

    return dispatch({
      type: MLB_DATA,
      payload: filterdList,
    });
  };
}

function getPlayers(
  playerList,
  homeTeam = "",
  awayTeam = "",
  venue = {},
  match_id = "",
  date_time = ""
) {
  const _playerList = [];

  if (playerList?.length) {
    for (let i = 0; i < playerList?.length; i++) {
      const {
        current_position = "",
        current_team = "",
        is_injured = "",
        name = "",
        player_id = "",
        type = "",
        mlb_player_stats = [],
      } = playerList[i] || {};

      const mlbPlayerStats =
        (mlb_player_stats?.length && mlb_player_stats[0]) || {};

      const time = moment(date_time).format("LT");
      const date = moment(date_time).format("YYYY-MM-DD");

      const player = {
        currentPosition: current_position,
        currentTeamId: current_team,
        isInjured: is_injured,
        playerName: name,
        playerId: player_id,
        type,
        homeTeam,
        awayTeam,
        match_id,
        date: date,
        time: time,
        stadium: venue?.name,
        playerStats: { ...mlbPlayerStats },
      };

      _playerList.push(player);
    }
  }

  return _playerList;
}

function getFilterPlayersList(filter = "", playersList = []) {
  const list =
    playersList?.length &&
    playersList?.filter(
      (player) => `${player.type}`?.toLocaleLowerCase() === filter
    );

  const players = {
    type: filter,
    players: [...list],
  };

  return players;
}

export function mlbLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_STAR_PLAYER_COUNT,
      payload,
    });
}
