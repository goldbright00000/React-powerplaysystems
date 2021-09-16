import http from "../config/http";
import { URLS } from "../config/urls";
import moment from "moment";

import { CONSTANTS } from "../utility/constants";
import { printLog } from "../utility/shared";

export const NHL_DATA = "[NHL] GET_SET_DATA";
export const NHL_LIVE_DATA = "[NHL] NHL_LIVE_DATA";
export const NHL_STAR_PLAYER_COUNT = "[NHL] STAR_PLAYER_COUNT";
export const NHL_EDIT_PLAYERS = "[NHL] NHL_EDIT_PLAYERS";
export const NHL_USER_SAVED_GAMES = "[NHL] NHL_USER_SAVED_GAMES";
export const NHL_USER_EDITED_GAMES = "[NHL] NHL_USER_EDITED_GAMES";
export const SET_GAME_LOGS = "[NHL] SET_GAME_LOGS";
export const SET_SELECTED_TEAM = "[NHL] SET_SELECTED_TEAM";

const { FILTERS } = CONSTANTS;
const { CENTER, XW, LW, RW, D, G, TD } = FILTERS.NHL;

export function nhlData(gameId) {
  return async (dispatch) => {
    try {
      const response = await http.get(`${URLS.DFS.NHL}?game_id=${gameId}`);

      const { data: { nhlSchedule = [], game_id = "", sport_id = "" } = {} } =
        response.data || {};

      const nhlPlayerList = [];
      const nhlTeams = [];
      for (let i = 0; i < nhlSchedule?.length; i++) {
        const {
          away_team = {},
          home_team = {},
          date_time = "",
          venue = {},
          match_id = "",
        } = nhlSchedule[i] || {};

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

        nhlTeams.push(awayTeam);
        nhlTeams.push(homeTeam);

        const { nhl_players: awayTeamPlayers = [], name: awayTeamName = "" } =
          away_team || {};
        const { nhl_players: homeTeamPlayers = [], name: homeTeamName = "" } =
          home_team || {};
        const _awayTeamPlayersList = getPlayers(
          awayTeamPlayers,
          awayTeamName,
          homeTeamName,
          venue,
          match_id,
          date_time,
          awayTeam?.team_id,
          homeTeam?.team_id
        );
        const _homeTeamPlayersList = getPlayers(
          homeTeamPlayers,
          homeTeamName,
          awayTeamName,
          venue,
          match_id,
          date_time,
          homeTeam?.team_id,
          awayTeam?.team_id
        );
        const playersList = [..._awayTeamPlayersList, ..._homeTeamPlayersList];
        nhlPlayerList.push(...playersList);
      }

      //filter the data on the basis of types
      const filterdList = [];
      const centerTypePlayers = getFilterPlayersList(CENTER, nhlPlayerList);
      const xwTypePlayers = getFilterPlayersList(XW, nhlPlayerList);
      const dTypePlayers = getFilterPlayersList(D, nhlPlayerList);
      const gTypePlayers = getFilterPlayersList(G, nhlPlayerList);
      const tdTypePlayers = { type: TD, listData: nhlTeams };
      filterdList.push(centerTypePlayers);
      filterdList.push(xwTypePlayers);
      filterdList.push(dTypePlayers);
      filterdList.push(gTypePlayers);
      filterdList.push(tdTypePlayers);
      nhlPlayerList.push(...nhlTeams);

      dispatch({
        type: NHL_DATA,
        payload: { filterdList: filterdList, allData: nhlPlayerList },
        game_id,
        sport_id,
      });

      return {
        filterdList: filterdList,
        allData: nhlPlayerList,
        game_id,
        sport_id,
      };
    } catch (err) {
      return err;
    }
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
    type: "td",
  };
}

function getPlayers(
  playerList,
  homeTeam = "",
  awayTeam = "",
  venue = {},
  match_id = "",
  date_time = "",
  teamId = "",
  awayTeamId = ""
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
        nhl_player_season_stats = [],
        current_position = "",
      } = playerList[i] || {};

      const nhl_player_stats = nhl_player_season_stats;

      const nhlPlayerStats =
        (nhl_player_stats?.length && nhl_player_stats[0]) || {};

      const time = moment(date_time).format("LT");
      const date = moment(date_time).format("YYYY-MM-DD");

      const player = {
        primary_position: primary_position,
        currentTeamId: current_team,
        isInjured: is_injured,
        playerName: name,
        playerId: player_id,
        type: primary_position,
        homeTeam,
        awayTeam,
        match_id,
        date: date,
        time: time,
        stadium: venue?.name,
        playerStats: { ...nhlPlayerStats },
        team_id: teamId,
        awayTeam_id: awayTeamId,
        current_position,
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
      (player) => `${player.primary_position}`?.toLocaleLowerCase() === filter
    );

  const players = {
    type: filter,
    listData: [...list],
  };

  return players;
}

export function nhlLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NHL_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NHL_STAR_PLAYER_COUNT,
      payload,
    });
}

export function saveAndGetSelectPlayers(payload) {
  return async (dispatch) => {
    try {
      const response = await http.post(URLS.DFS.NHL_SAVE_PLAYERS, payload);
      const { message = "", error = false } = response.data || {};
      if (!error && message === "Success") {
        //get the live page players and save them in redux
        try {
          if (!payload.game_id || !payload.sport_id || !payload.user_id) {
            return alert(
              "Invalid informations",
              payload.game_id,
              payload.user_id,
              payload.sport_id
            );
          }
        } catch (er) {}
      }
    } catch (err) {}
  };
}

export async function getSavedTeamPlayers(payload) {
  try {
    const playersResponse = await http.post(URLS.DFS.NHL_LIVE_PAGE_PLAYERS, {
      game_id: payload.game_id,
      sport_id: payload.sport_id,
      user_id: payload.user_id,
    });

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

    return {
      players,
      teamD,
      team_id,
    };
  } catch (err) {
    console.log(err);
  }
}

export function getMlbLivePlayPlayerTeamData(payload) {
  return async (dispatch) => {
    const teamPlayers = await getSavedTeamPlayers(payload);

    return teamPlayers;
  };
}

export function getAndSetEditPlayers(
  payload = { game_id: 0, sport_id: 0, user_id: 0 }
) {
  return async (dispatch) => {
    const teamPlayers = await getSavedTeamPlayers(payload);
    const players = teamPlayers?.players || [];
    const teamD = teamPlayers?.teamD;
    const savedPlayers = [];
    for (let i = 0; i < players?.length; i++) {
      const obj = {
        matchId: players[i]?.match_id,
        playerId: players[i]?.player_id,
      };
      savedPlayers.push(obj);
    }

    const teamDObj = {
      team_id: teamD[0]?.team_d,
      match_id: teamD[0]?.match_id,
    };

    savedPlayers.push(teamDObj);

    return dispatch(
      setEditPlayers({
        team_id: teamPlayers.team_id,
        data: savedPlayers,
        isEdit: true,
      })
    );
  };
}

export function setEditPlayers(
  payload = { data: [], isEdit: false, team_id: 0 }
) {
  return (dispatch) => {
    dispatch({
      type: NHL_EDIT_PLAYERS,
      payload: {
        data: payload?.data,
        isEdit: payload?.isEdit,
        team_id: payload?.team_id,
      },
    });
  };
}

export function getUserGames(user_id) {
  return async (dispatch) => {
    try {
      const userGamesResponse = await http.post(URLS.DFS.NHL_USER_GAMES, {
        user_id: user_id,
      });
      const { data = {} } = userGamesResponse || {};
      await dispatch({
        type: NHL_USER_SAVED_GAMES,
        payload: data?.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editDfsTeamPlayer(payload) {
  return async (dispatch) => {
    try {
      const userEditedGame = await http.post(URLS.DFS.NHL_EDIT_TEAM_PLAYER, {
        payload,
      });
      const { data = {} } = userEditedGame || {};

      await dispatch({
        type: NHL_USER_EDITED_GAMES,
        payload: data?.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function calculateAdminFee(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.CALCULATE_ADMIN_FEE}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function deductUserBalance(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.DEDUCT_USER_BALANCE}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function savePrizePool(user_id, game_id) {
  return async (dispatch) => {
    try {
      http.post(
        `${process.env.REACT_APP_API_URL}/${URLS.DFS.SAVE_PRIZE_POOL}`,
        {
          user_id,
          game_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function setGameLogs(data) {
  return (dispatch) => {
    return dispatch({
      type: SET_GAME_LOGS,
      payload: data,
    });
  };
}

export function getUserRemainingPowers(game_id, user_id) {
  return async (dispatch) => {
    try {
      const response = await http.get(
        `${process.env.REACT_APP_API_URL}/api/v1${URLS.DFS.GET_USERS_POWERS}?game_id=${game_id}&user_id=${user_id}`
      );
      return dispatch({
        type: "userPowers",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateUserRemainingPowers(game_id, user_id, power_id) {
  return async (dispatch) => {
    try {
      console.log("PAYLOAD: ", game_id, user_id, power_id);
      const response = await http.patch(
        `${process.env.REACT_APP_API_URL}/api/v1${URLS.DFS.UPDATE_USERS_POWERS}`,
        {
          game_id: game_id,
          user_id: user_id,
          power_id: power_id,
        }
      );
      return dispatch({
        type: "userPowers",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setSelectedTeam(payload) {
  return async (dispatch) => {
    return await dispatch({
      type: SET_SELECTED_TEAM,
      payload,
    });
  };
}

export function setLiveNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_LIVE_DATA, payload });
}
export function setNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_DATA, payload });
}
export function starPlayerCount(payload) {
  return (dispatch) => dispatch({ type: NHL_STAR_PLAYER_COUNT, payload });
}
