import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";
import { printLog } from "../utility/shared";

export const MLB_DATA = "[MLB] GET_SET_DATA";
export const MLB_LIVE_DATA = "[MLB] MLB_LIVE_DATA";
export const MLB_STAR_PLAYER_COUNT = "[MLB] STAR_PLAYER_COUNT";

const { FILTERS } = CONSTANTS;
const { P, OF, C, SS, D, XB } = FILTERS.MLB;

export function mlbData() {
  return async (dispatch) => {
    const response = await http.get(URLS.DFS.MLB);
    const { data: { mlbSchedule = [], game_id = "", sport_id = "" } = {} } =
      response.data || {};

    const mlbPlayerList = [];
    const mlbTeams = [];
    for (let i = 0; i < mlbSchedule?.length; i++) {
      const {
        away_team = {},
        home_team = {},
        date_time = "",
        venue = {},
        match_id = "",
      } = mlbSchedule[i] || {};

      const awayTeam = getTeam(
        away_team,
        home_team,
        match_id,
        venue,
        date_time
      );
      const homeTeam = getTeam(
        home_team,
        away_team,
        match_id,
        venue,
        date_time
      );

      mlbTeams.push(awayTeam);
      mlbTeams.push(homeTeam);

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
    const dTypePlayers = { type: D, listData: mlbTeams };
    filterdList.push(pTypePlayers);
    filterdList.push(ofTypePlayers);
    filterdList.push(cTypePlayers);
    filterdList.push(ssTypePlayers);
    filterdList.push(xBTypePlayers);
    filterdList.push(dTypePlayers);

    return dispatch({
      type: MLB_DATA,
      payload: filterdList,
      game_id,
      sport_id,
    });
  };
}

function getTeam(currentTeam, opponentTeam, match_id, venue, date_time) {
  const time = moment(date_time).format("LT");
  const date = moment(date_time).format("YYYY-MM-DD");
  return {
    ...currentTeam,
    teamBName: opponentTeam.name,
    teamBCity: opponentTeam.city,
    match_id,
    venue,
    time,
    date,
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
        primary_position = "",
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
        primary_position: primary_position,
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
    listData: [...list],
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

export function saveAndGetSelectPlayers(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(URLS.DFS.MLB_SAVE_PLAYERS, payload);
      const { message = "", error = false } = response.data || {};
      if (!error && message === "Success") {
        //get the live page players and save them in redux
        try {
          if (!payload.gameId || !payload.sportId || !payload.userId) {
            return alert(
              "Invalid informations",
              payload.gameId,
              payload.userId,
              payload.sportId
            );
          }
          const playersResponse = await http.post(
            URLS.DFS.MLB_LIVE_PAGE_PLAYERS,
            {
              game_id: payload.gameId,
              sport_id: payload.sportId,
              user_id: payload.userId,
            }
          );

          const { data = {} } = playersResponse.data || {};
          const {
            game_id,
            sport_id,
            user_id,
            team_id,
            teamD = {},
            players = [],
          } = data || {};

          for (let i = 0; i < players?.length; i++) {
            const player = players[i];
            Object.assign(player, {
              playerName: player?.name,
              playerId: player?.player_id,
            });

            delete player?.name;
          }
          return dispatch(mlbLiveData({ players, teamD }));
        } catch (er) {}
      }
    } catch (err) {}
  };
}
